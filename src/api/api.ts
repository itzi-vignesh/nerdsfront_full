import axios, { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-hot-toast';

// Configure base URLs based on environment
export const AUTH_API_URL = import.meta.env.VITE_API_URL || 'https://nerd-api.nerdslab.in';
export const LAB_API_URL = import.meta.env.VITE_LAB_API_URL || 'https://lab.nerdslab.in';
export const FRONTEND_URL = import.meta.env.VITE_FRONTEND_URL || 'https://learn.nerdslab.in';

// For debugging in development
if (process.env.NODE_ENV !== 'production') {
  console.log('API URLs:', {
    AUTH_API_URL,
    LAB_API_URL,
    FRONTEND_URL,
    NODE_ENV: process.env.NODE_ENV
  });
}

// Create configured axios instances
const authApi = axios.create({
  baseURL: AUTH_API_URL,
  withCredentials: true,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  }
});

const labApi = axios.create({
  baseURL: import.meta.env.VITE_LAB_API_URL || 'http://localhost:8000',
  withCredentials: true,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  }
});

// Get CSRF token from cookie
const getCsrfToken = (): string | null => {
  const name = 'csrftoken=';
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(';');
  
  for (let i = 0; i < cookieArray.length; i++) {
    let cookie = cookieArray[i].trim();
    if (cookie.indexOf(name) === 0) {
      return cookie.substring(name.length, cookie.length);
    }
  }
  return null;
};

// Add auth token interceptor to both instances
[authApi, labApi].forEach(api => {
  api.interceptors.request.use(config => {
    // Add auth token if available
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Token ${token}`;
    }
    
    // Add CSRF token for non-GET requests
    if (config.method !== 'get') {
      const csrfToken = getCsrfToken();
      if (csrfToken) {
        config.headers['X-CSRFToken'] = csrfToken;
      }
    }

    // Add X-Requested-With header for all requests
    config.headers['X-Requested-With'] = 'XMLHttpRequest';

    // Add X-User-Hash if available
    const userHash = localStorage.getItem('userHash');
    if (userHash) {
      config.headers['X-User-Hash'] = userHash;
    }
    
    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        // Only redirect to login if we're not already on the login page
        if (!window.location.pathname.includes('/login')) {
          // Clear auth data
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          localStorage.removeItem('userId');
          localStorage.removeItem('username');
          
          // Redirect to login with return path
          const returnPath = window.location.pathname;
          window.location.href = `/login?returnTo=${encodeURIComponent(returnPath)}`;
        }
      }
      return Promise.reject(error);
    }
  );
});

// Auth API endpoints
export const authAPI = {
  login: async (username: string, password: string) => {
    const response = await authApi.post('/accounts/login/', { username, password });
    return response.data;
  },
  
  logout: async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        // If no token, just clear local storage and return
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('userId');
        localStorage.removeItem('username');
        return { message: 'Logged out successfully' };
      }

      // First get a new CSRF token
      await authApi.get('/accounts/csrf/');
      
      // Then attempt logout with the token
      const response = await authApi.post('/accounts/logout/', {}, {
        headers: {
          'Authorization': `Token ${token}`,
          'X-CSRFToken': getCsrfToken() || '',
          'X-Requested-With': 'XMLHttpRequest'
        }
      });

      // Clear local storage after successful logout
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('userId');
      localStorage.removeItem('username');
      
      return response.data;
    } catch (error) {
      // Even if the server request fails, clear local storage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('userId');
      localStorage.removeItem('username');
      
      if (axios.isAxiosError(error)) {
        // If it's a 403, we can still consider it a successful logout
        if (error.response?.status === 403) {
          console.log('Logout request returned 403, but local storage cleared successfully');
          return { message: 'Logged out successfully' };
        }
        console.error('Logout error:', error.response?.data || error.message);
        throw new Error(error.response?.data?.error || 'Failed to logout');
      }
      throw error;
    }
  },
  
  register: async (username: string, email: string, password: string, password2: string, first_name: string, last_name: string) => {
    const userData = {
      username,
      email, 
      password, 
      password2,
      first_name,
      last_name
    };
    
    const response = await authApi.post('/accounts/register/', userData);
    return response.data;
  },
  
  getProfile: async () => {
    const response = await authApi.get('/accounts/me/');
    return response.data;
  },
  
  changePassword: async (currentPassword: string, newPassword: string, newPasswordConfirm: string) => {
    const response = await authApi.post('/accounts/change-password/', {
      current_password: currentPassword,
      new_password: newPassword,
      new_password_confirm: newPasswordConfirm
    });
    return response.data;
  },

  forgotPassword: async (email: string): Promise<void> => {
    try {
      console.log('Initiating password reset request for:', email);
      
      // First get a fresh CSRF token
      console.log('Getting fresh CSRF token...');
      await authApi.get('/accounts/csrf/');
      
      // Then make the password reset request
      console.log('Sending password reset request...');
      const response = await authApi.post('/accounts/password-reset/', { email });
      
      if (response.status === 200) {
        console.log('Password reset request successful');
        toast.success('If an account exists with this email, you will receive a password reset link.');
      } else {
        console.error('Unexpected response status:', response.status);
        throw new Error('Failed to send password reset email');
      }
    } catch (error) {
      console.error('Password reset request failed:', error);
      
      // If we get a 403, it might be due to CSRF token issues
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 403) {
          console.log('CSRF token issue detected, retrying with fresh token...');
          try {
            await authApi.get('/accounts/csrf/');
            const retryResponse = await authApi.post('/accounts/password-reset/', { email });
            
            if (retryResponse.status === 200) {
              console.log('Password reset retry successful');
              toast.success('If an account exists with this email, you will receive a password reset link.');
              return;
            }
          } catch (retryError) {
            console.error('Password reset retry failed:', retryError);
            if (axios.isAxiosError(retryError)) {
              if (retryError.response?.status === 500) {
                toast.error('Email service is currently unavailable. Please try again later.');
                return;
              }
            }
          }
        } else if (error.response?.status === 500) {
          toast.error('Email service is currently unavailable. Please try again later.');
          return;
        }
      }
      
      // Show generic error message to user
      toast.error('Failed to send password reset email. Please try again later.');
      throw error;
    }
  },

  resetPassword: async (token: string, password: string, password2: string) => {
    const response = await authApi.post('/accounts/password-reset/confirm/', { token, password, password2 });
    return response.data;
  },

  verifyEmail: async (token: string) => {
    const response = await authApi.post('/accounts/verify-email/', { token });
    return response.data;
  },

  resendVerification: async (email: string) => {
    const response = await authApi.post('/accounts/resend-verification/', { email });
    return response.data;
  }
};

// Map lab IDs to their corresponding lab.nerdslab.in IDs
const LAB_ID_MAP: Record<string, string> = {
  'mediconnect-lab': 'lab1',
  'feedme-lab': 'lab2'
};

// Labs API endpoints
export const labsAPI = {
  getTemplates: async () => {
    const response = await authApi.get('/labs/templates/');
    return response.data;
  },
  
  getLab: async (labId: string) => {
    return authApi.get(`/labs/details/${labId}/`);
  },
  
  startLab: async (labId: string) => {
    const userId = localStorage.getItem('userId');
    const username = localStorage.getItem('username');
    
    if (!userId || !username) {
      throw new Error('User information not found');
    }
    
    const userHash = generateHash(userId, username);
    const mappedLabId = LAB_ID_MAP[labId] || labId;
    const response = await labApi.post('/api/start-lab/', {
      lab_id: mappedLabId,
      user_hash: userHash
    });
    return response.data;
  },
  
  stopLab: async (labId: string) => {
    const userId = localStorage.getItem('userId');
    const username = localStorage.getItem('username');
    
    if (!userId || !username) {
      throw new Error('User information not found');
    }
    
    const userHash = generateHash(userId, username);
    const mappedLabId = LAB_ID_MAP[labId] || labId;
    const response = await labApi.post('/api/stop-lab/', {
      lab_id: mappedLabId,
      user_hash: userHash
    });
    return response.data;
  },

  verifyFlag: async (labId: string, flag: string) => {
    return authApi.post('/labs/verify-flag/', {
      lab_id: labId,
      flag: flag
    });
  },

  getLabStatus: async (labId: string) => {
    try {
      const userId = localStorage.getItem('userId');
      const username = localStorage.getItem('username');
      
      if (!userId || !username) {
        throw new Error('User information not found');
      }
      
      const userHash = generateHash(userId, username);
      const mappedLabId = LAB_ID_MAP[labId] || labId;
      const response = await labApi.get(`/labs/status/?lab_id=${mappedLabId}`, {
        headers: {
          'X-User-Hash': userHash
        }
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          return { status: 'not_found', lab_id: labId };
        }
        throw new Error(error.response?.data?.error || 'Failed to get lab status');
      }
      throw error;
    }
  }
};

// Helper function to generate user hash
function generateHash(userId: string | number, username: string): string {
  const str = `${userId}:${username}`;
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(36);
}

// Add interceptors for lab API
labApi.interceptors.request.use(
  async (config) => {
    // Add auth token if available
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Add CSRF token for non-GET requests
    if (config.method !== 'get') {
      const csrfToken = getCsrfToken();
      if (csrfToken) {
        config.headers['X-CSRFToken'] = csrfToken;
      }
    }

    // Add user hash
    const userId = localStorage.getItem('userId');
    const username = localStorage.getItem('username');
    if (userId && username) {
      const userHash = generateHash(userId, username);
      config.headers['X-User-Hash'] = userHash;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Lab API endpoints
export const labApiEndpoints = {
  getLabStatus: async (labId: string) => {
    try {
      const response = await labApi.get(`/api/labs/status/?lab_id=${labId}`);
      return response.data;
    } catch (error) {
      console.error('Error getting lab status:', error);
      throw error;
    }
  },

  startLab: async (labId: string) => {
    try {
      const response = await labApi.post('/api/labs/start/', { lab_id: labId });
      return response.data;
    } catch (error) {
      console.error('Error starting lab:', error);
      throw error;
    }
  },

  stopLab: async (labId: string) => {
    try {
      const response = await labApi.post('/api/labs/stop/', { lab_id: labId });
      return response.data;
    } catch (error) {
      console.error('Error stopping lab:', error);
      throw error;
    }
  }
};

export default authApi;
