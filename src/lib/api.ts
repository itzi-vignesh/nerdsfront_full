import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import { toast } from '@/components/ui/use-toast';

// API URLs from environment variables
const AUTH_API_URL = import.meta.env.VITE_API_URL || 'https://nerd-api.nerdslab.in';
const LAB_API_URL = import.meta.env.VITE_LAB_API_URL || 'https://lab.nerdslab.in';
const FRONTEND_URL = import.meta.env.VITE_FRONTEND_URL || 'https://learn.nerdslab.in';

// Rate limiting configuration
const RATE_LIMIT = {
  maxRequests: 100,
  perMinute: 1,
  retryAfter: 60
};

// Request tracking
const requestTracker = {
  requests: [] as number[],
  addRequest() {
    const now = Date.now();
    this.requests = this.requests.filter(time => now - time < 60000);
    this.requests.push(now);
  },
  isRateLimited() {
    return this.requests.length >= RATE_LIMIT.maxRequests;
  }
};

// Create axios instances with default configs
const createAxiosInstance = (baseURL: string): AxiosInstance => {
  const instance = axios.create({
    baseURL,
    timeout: 30000,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    withCredentials: true,
  });

  // Request interceptor
  instance.interceptors.request.use(
    (config) => {
      // Check rate limiting
      if (requestTracker.isRateLimited()) {
        toast({
          title: "Rate limit exceeded",
          description: "Please wait a moment before trying again.",
          variant: "destructive"
        });
        return Promise.reject(new Error('Rate limit exceeded'));
      }

      requestTracker.addRequest();

      // Add user hash if available
      const userHash = localStorage.getItem('user_hash');
      if (userHash) {
        config.headers['X-User-Hash'] = userHash;
      }
      
      // Add CSRF token if available
      const csrfToken = document.cookie.split('; ').find(row => row.startsWith('csrftoken='));
      if (csrfToken) {
        config.headers['X-CSRFToken'] = csrfToken.split('=')[1];
      }

      // Add security headers
      config.headers['X-Content-Type-Options'] = 'nosniff';
      config.headers['X-Frame-Options'] = 'DENY';
      config.headers['X-XSS-Protection'] = '1; mode=block';

      return config;
    },
    (error) => {
      console.error('Request error:', error);
      return Promise.reject(error);
    }
  );

  // Response interceptor
  instance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError<{ message?: string; error?: string }>) => {
      if (error.code === 'ECONNABORTED') {
        toast({
          title: "Request timeout",
          description: "The request took too long to complete. Please try again.",
          variant: "destructive"
        });
      } else if (error.response?.status === 401) {
        // Handle unauthorized access
        localStorage.removeItem('user_hash');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
      } else if (error.response?.status === 403) {
        // Handle forbidden access
        toast({
          title: "Access denied",
          description: "You don't have permission to perform this action.",
          variant: "destructive"
        });
      } else if (error.response?.status === 429) {
        // Handle rate limiting
        toast({
          title: "Too many requests",
          description: "Please wait a moment before trying again.",
          variant: "destructive"
        });
      } else {
        // Handle other errors
        toast({
          title: "Error",
          description: error.response?.data?.error || error.response?.data?.message || "An unexpected error occurred.",
          variant: "destructive"
        });
      }

      return Promise.reject(error);
    }
  );

  return instance;
};

// Create API instances
const authApi = createAxiosInstance(AUTH_API_URL);
const labApi = createAxiosInstance(LAB_API_URL);

// Helper function to extract lab type from ID
const extractLabTypeFromId = (labId: string): string => {
  return labId.split('-')[0];
};

// Auth API wrapper
export const authAPI = {
  login: async (username: string, password: string) => {
    try {
      const response = await authApi.post('/accounts/login/', { username, password });
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  register: async (username: string, email: string, password: string, password2: string, first_name: string, last_name: string) => {
    try {
      const response = await authApi.post('/accounts/register/', {
        username,
        email,
        password,
        password2,
        first_name,
        last_name
      });
      return response.data;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },

  logout: async () => {
    try {
      await authApi.post('/accounts/logout/');
      localStorage.removeItem('user_hash');
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  },

  getCurrentUser: async () => {
    try {
      const response = await authApi.get('/accounts/me/');
      return response.data;
    } catch (error) {
      console.error('Get current user error:', error);
      throw error;
    }
  },

  forgotPassword: async (email: string) => {
    try {
      const response = await authApi.post('/accounts/password-reset/', { email });
      return response.data;
    } catch (error) {
      console.error('Forgot password error:', error);
      throw error;
    }
  },

  resetPassword: async (token: string, newPassword: string) => {
    try {
      const response = await authApi.post('/accounts/password-reset/confirm/', {
        token,
        new_password: newPassword,
      });
      return response.data;
    } catch (error) {
      console.error('Reset password error:', error);
      throw error;
    }
  },

  resendVerification: async (email: string) => {
    try {
      const response = await authApi.post('/accounts/resend-verification/', { email });
      return response.data;
    } catch (error) {
      console.error('Resend verification error:', error);
      throw error;
    }
  },
};

// Lab API wrapper
export const labsAPI = {
  getLab: async (labId: string) => {
    try {
      const response = await labApi.get(`/labs/status/?lab_id=${labId}`);
      return response.data;
    } catch (error) {
      console.error('Get lab error:', error);
      throw error;
    }
  },

  startLab: async (labId: string) => {
    try {
      const userHash = localStorage.getItem('user_hash');
      if (!userHash) {
        throw new Error('User hash not found');
      }
      const response = await labApi.post('/labs/start/', {
        lab_id: labId,
        user_hash: userHash
      });
      return response.data;
    } catch (error) {
      console.error('Start lab error:', error);
      throw error;
    }
  },

  stopLab: async (labId: string) => {
    try {
      const userHash = localStorage.getItem('user_hash');
      if (!userHash) {
        throw new Error('User hash not found');
      }
      const response = await labApi.post('/labs/stop/', {
        lab_id: labId,
        user_hash: userHash
      });
      return response.data;
    } catch (error) {
      console.error('Stop lab error:', error);
      throw error;
    }
  },

  verifyFlag: async (labId: string, flag: string) => {
    try {
      const response = await authApi.post('/labs/verify-flag/', {
        lab_id: labId,
        flag: flag
      });
      return response.data;
    } catch (error) {
      console.error('Verify flag error:', error);
      throw error;
    }
  },

  getLabStatus: async () => {
    try {
      const response = await authApi.get('/labs/status/');
      return response.data;
    } catch (error) {
      console.error('Get lab status error:', error);
      throw error;
    }
  }
};

const generateRandomLabUrl = (labId: string, isAdmin: boolean = false): string => {
  const labType = extractLabTypeFromId(labId);
  const randomString = Math.random().toString(36).substring(2, 8);
  const baseDomain = import.meta.env.VITE_FRONTEND_URL || 'https://learn.nerdslab.in';
  
  if (isAdmin) {
    return `https://admin-${randomString}-${labType}.${baseDomain}`;
  }
  return `https://${randomString}-${labType}.${baseDomain}`;
}; 