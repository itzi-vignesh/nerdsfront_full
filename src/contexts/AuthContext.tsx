import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import { authAPI } from '@/lib/api';

// Use the relative path for API calls
const API_BASE_URL = `/api/accounts`;

interface User {
  id: string;
  username: string;
  email: string;
  fullName: string;
  avatarUrl: string;
  level: number;
  experience: number;
  experienceToNextLevel: number;
  rank: number;
  achievements: number;
  labsCompleted: number;
  certifications: string[];
  skills: Record<string, number>;
  linkedIn?: string;
  profileCompleted: number;
  token?: string;
  isVerified?: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  token: string | null;
  login: (username: string, password: string) => Promise<any>;
  logout: () => Promise<void>;
  register: (username: string, email: string, password: string, password2: string, first_name: string, last_name: string) => Promise<any>;
  forgotPassword: (email: string) => Promise<boolean>;
  resetPassword: (token: string, password: string, password2: string) => Promise<any>;
  setToken: (token: string | null) => void;
  changePassword: (currentPassword: string, newPassword: string, newPasswordConfirm: string) => Promise<any>;
  verifyEmail: (token: string) => Promise<any>;
  resendVerification: (email: string) => Promise<any>;
}

// Create the context with a default empty implementation
export const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  token: null,
  login: async () => ({ success: false }),
  logout: async () => {},
  register: async () => ({ success: false }),
  forgotPassword: async () => false,
  resetPassword: async () => ({ success: false }),
  setToken: () => {},
  changePassword: async () => ({ success: false }),
  verifyEmail: async () => ({ success: false }),
  resendVerification: async () => ({ success: false })
});

// Default user schema - will be populated from API
const defaultUser: User = {
  id: "",
  username: "",
  email: "",
  fullName: "",
  avatarUrl: "/avatar.png",
  level: 1,
  experience: 0,
  experienceToNextLevel: 1000,
  rank: 0,
  achievements: 0,
  labsCompleted: 0,
  certifications: [],
  skills: {},
  profileCompleted: 0,
  isVerified: true // Default to true unless we know it's false
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const navigate = useNavigate();

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const savedToken = localStorage.getItem('token');
        const savedUser = localStorage.getItem('user');
        
        if (savedToken && savedUser) {
          // Set token first
          setToken(savedToken);
          
          // Parse and set user data
          const parsedUser = JSON.parse(savedUser);
          setUser(parsedUser);
          
          // Verify token and fetch fresh user data
          const userDetailsSuccess = await fetchUserDetails();
          if (!userDetailsSuccess) {
            // If token is invalid, clear everything
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            setToken(null);
            setUser(null);
          }
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
        // Clear invalid data
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setToken(null);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const fetchUserDetails = async () => {
    try {
      const response = await authAPI.getCurrentUser();
      const userData = response.data || response;
      
      const fullUser: User = {
        ...defaultUser,
        id: userData.id || "",
        username: userData.username || "",
        email: userData.email || "",
        fullName: `${userData.first_name || ""} ${userData.last_name || ""}`.trim(),
        isVerified: userData.is_active || false,
      };
      
      setUser(fullUser);
      localStorage.setItem('user', JSON.stringify(fullUser));
      return true;
    } catch (error) {
      console.error("Error fetching user details:", error);
      return false;
    }
  };

  const login = async (username: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await authAPI.login(username, password);
      
      // Check if response has token property
      if (response && response.token) {
        const { token } = response;
        
        // Update token first
        updateToken(token);
        
        // Store user data if available
        if (response.user) {
          const userData = response.user;
          const fullUser: User = {
            ...defaultUser,
            id: userData.id || "",
            username: userData.username || "",
            email: userData.email || "",
            fullName: `${userData.first_name || ""} ${userData.last_name || ""}`.trim(),
            isVerified: userData.is_active || false,
          };
          setUser(fullUser);
          localStorage.setItem('user', JSON.stringify(fullUser));
          
          // Generate and store user hash
          const userHash = generateUserHash(userData.id, userData.username);
          localStorage.setItem('user_hash', userHash);
        }
        
        // Show success message
        toast({
          title: "Logged in successfully",
          description: "Welcome back to Cyber Nerds Academy!",
        });
        
        // Navigate to dashboard only once
        navigate('/dashboard');
        return { success: true };
      } else {
        throw new Error("Invalid response format from server");
      }
    } catch (error: any) {
      // Clear any existing tokens and user data on error
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('user_hash');
      setUser(null);
      
      toast({
        title: "Login failed",
        description: error.response?.data?.error || "Please check your credentials",
        variant: "destructive",
      });
      return {
        success: false,
        errors: error.response?.data || { non_field_errors: ["An error occurred"] }
      };
    } finally {
      setIsLoading(false);
    }
  };

  // Helper function to generate a consistent user hash
  const generateUserHash = (userId: string | number, username: string): string => {
    const data = `${userId}:${username}:${Date.now()}`;
    let hash = 0;
    for (let i = 0; i < data.length; i++) {
      const char = data.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash).toString(36);
  };

  const register = async (username: string, email: string, password: string, password2: string, first_name: string, last_name: string) => {
    setIsLoading(true);
    try {
      // Create userData object with all required fields
      const userData = {
        username,
        email,
        password,
        password2,
        first_name,
        last_name
      };
      
      // Call the register function with all parameters
      const response = await authAPI.register(username, email, password, password2, first_name, last_name);
      
      // Extract token and user data from the response
      if (response.data && response.data.token) {
        const { token } = response.data;
        updateToken(token);
        
        // Merge API user data with our frontend user schema
        const userData = response.data.user;
        const fullUser: User = {
          ...defaultUser,
          id: userData.id || "",
          username: userData.username || "",
          email: userData.email || "",
          fullName: `${userData.first_name || ""} ${userData.last_name || ""}`.trim(),
          isVerified: true, // User is now automatically verified
        };
        
        setUser(fullUser);
        localStorage.setItem('user', JSON.stringify(fullUser));
        
        toast({
          title: "Account created",
          description: "Welcome to Cyber Nerds Academy!",
        });
        
        // Navigate directly to dashboard
        navigate('/dashboard');
        return { success: true };
      } else {
        throw new Error("Invalid response format from server");
      }
    } catch (error: any) {
      // Extract the error details from the response
      const errorData = error.response?.data || {};
      
      // Show a toast with a generic error message
      toast({
        title: "Registration failed",
        description: "Please check the form for errors",
        variant: "destructive",
      });
      
      // Return the error data for field-specific handling in the component
      return { 
        success: false, 
        errors: errorData
      };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (token) {
        await authAPI.logout();
      }
    } catch (error) {
      // Silent error handling
    } finally {
      // Always clear local storage and state, even if API call fails
      setUser(null);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      updateToken(null);
      setIsLoading(false);
      toast({
        title: "Logged out",
        description: "You have been successfully logged out",
      });
      navigate('/');
    }
  };

  const forgotPassword = async (email: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      await authAPI.forgotPassword(email);
      toast({
        title: "Password reset email sent",
        description: "Check your email for instructions to reset your password",
      });
      return true;
    } catch (error: any) {
      const errorMessage = error.response?.data?.email?.[0] || error.response?.data?.message || 'Unable to send reset email';
      toast({
        title: "Password reset failed",
        description: errorMessage,
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (token: string, password: string, password2: string): Promise<any> => {
    setIsLoading(true);
    try {
      const response = await authAPI.resetPassword(token, password, password2);
      const { token: authToken } = response.data;
      
      // If the API returns a token, save it and authenticate the user
      if (authToken) {
        updateToken(authToken);
        await fetchUserDetails();
      }
      
      toast({
        title: "Password reset successful",
        description: "Your password has been updated successfully",
      });
      return { success: true };
    } catch (error: any) {
      // Extract field-specific errors
      const errorData = error.response?.data || {};
      
      // Show a generic toast notification
      toast({
        title: "Password reset failed",
        description: "Please check the form for errors",
        variant: "destructive",
      });
      
      // Return detailed error data for field-specific handling
      return { 
        success: false, 
        errors: errorData 
      };
    } finally {
      setIsLoading(false);
    }
  };

  const updateToken = (newToken: string | null) => {
    if (newToken) {
      localStorage.setItem('token', newToken);
    } else {
      localStorage.removeItem('token');
    }
    setToken(newToken);
  };

  const changePassword = async (currentPassword: string, newPassword: string, newPasswordConfirm: string) => {
    setIsLoading(true);
    try {
      // Log the current token for debugging
      console.log("Using token for change password:", token);
      
      const response = await authAPI.changePassword(currentPassword, newPassword, newPasswordConfirm);
      console.log("Change password response:", response.data);
      
      // Extract new token from response if available
      const { token: newToken } = response.data;
      if (newToken) {
        console.log("Got new token:", newToken);
        updateToken(newToken);
        await fetchUserDetails();
      }
      
      toast({
        title: "Password changed successfully",
        description: "Your password has been updated successfully",
      });
      
      return { success: true };
    } catch (error: any) {
      console.error('Change password error:', error);
      
      // Extract field-specific errors
      const errorData = error.response?.data || {};
      
      // Show a generic toast notification
      toast({
        title: "Password change failed",
        description: "Please check the form for errors",
        variant: "destructive",
      });
      
      // Return detailed error information for field-specific handling
      return { 
        success: false, 
        errors: errorData 
      };
    } finally {
      setIsLoading(false);
    }
  };

  // Add new methods for email verification
  const verifyEmail = async (token: string) => {
    setIsLoading(true);
    try {
      console.log('Verifying email with token:', token);
      const response = await authAPI.verifyEmail(token);
      console.log('Email verification response:', response.data);
      
      if (response.data.token) {
        updateToken(response.data.token);
        
        // Create a new user object with verification status set to true
        const userData = response.data.user;
        const verifiedUser: User = {
          ...defaultUser,
          id: userData.id || "",
          username: userData.username || "",
          email: userData.email || "",
          fullName: `${userData.first_name || ""} ${userData.last_name || ""}`.trim(),
          isVerified: true, // User is now verified
        };
        
        // Update the user state and local storage
        setUser(verifiedUser);
        localStorage.setItem('user', JSON.stringify(verifiedUser));
        
        console.log('User verified successfully:', verifiedUser);
      }
      
      toast({
        title: "Email verified",
        description: "Your account has been verified successfully!",
      });
      
      return { success: true, data: response.data };
    } catch (error: any) {
      console.error('Email verification error:', error);
      const errorData = error.response?.data || {};
      console.error('Error data:', errorData);
      
      toast({
        title: "Verification failed",
        description: errorData.error || "Failed to verify your email",
        variant: "destructive",
      });
      
      return { success: false, errors: errorData };
    } finally {
      setIsLoading(false);
    }
  };

  const resendVerification = async (email: string) => {
    setIsLoading(true);
    try {
      const response = await authAPI.resendVerification(email);
      
      toast({
        title: "Verification email sent",
        description: "Please check your inbox and spam folder for the verification link",
      });
      
      return { success: true, data: response.data };
    } catch (error: any) {
      console.error('Resend verification error:', error);
      const errorData = error.response?.data || {};
      const errorMessage = errorData.error || "We couldn't send a verification email at this time. Please try again later.";
      
      toast({
        title: "Failed to resend verification",
        description: errorMessage,
        variant: "destructive",
      });
      
      return { success: false, errors: errorData };
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user, 
      isLoading, 
      token, 
      setToken: updateToken,
      login, 
      logout, 
      register,
      forgotPassword,
      resetPassword,
      changePassword,
      verifyEmail,
      resendVerification
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// Export the hook to use this context
export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};
