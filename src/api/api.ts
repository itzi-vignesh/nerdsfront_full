import axios, { AxiosError, AxiosResponse } from 'axios';

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
  }
});

const labApi = axios.create({
  baseURL: LAB_API_URL,
  withCredentials: true,
  headers: {
    'Accept': 'application/json',
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
    // Set content type for non-GET requests
    if (config.method !== 'get') {
      config.headers['Content-Type'] = 'application/json';
    }

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
    return authApi.post('/accounts/login/', { username, password });
  },
  
  logout: async () => {
    return authApi.post('/accounts/logout/');
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
    
    return authApi.post('/accounts/register/', userData);
  },
  
  getProfile: async () => {
    return authApi.get('/accounts/me/');
  },
  
  changePassword: async (currentPassword: string, newPassword: string, newPasswordConfirm: string) => {
    return authApi.post('/accounts/change-password/', {
      current_password: currentPassword,
      new_password: newPassword,
      new_password_confirm: newPasswordConfirm
    });
  },

  forgotPassword: async (email: string) => {
    return authApi.post('/accounts/password-reset/', { email });
  },

  resetPassword: async (token: string, password: string, password2: string) => {
    return authApi.post('/accounts/password-reset/confirm/', { token, password, password2 });
  },

  verifyEmail: async (token: string) => {
    return authApi.post('/accounts/verify-email/', { token });
  },

  resendVerification: async (email: string) => {
    return authApi.post('/accounts/resend-verification/', { email });
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
    return authApi.get('/labs/templates/');
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
    return authApi.post('/labs/start/', {
      lab_id: labId,
          user_hash: userHash
    });
  },
  
  stopLab: async (labId: string) => {
    const userId = localStorage.getItem('userId');
    const username = localStorage.getItem('username');
    
    if (!userId || !username) {
      throw new Error('User information not found');
    }
    
    const userHash = generateHash(userId, username);
    return authApi.post('/labs/stop/', {
      lab_id: labId,
          user_hash: userHash
    });
  },

  verifyFlag: async (labId: string, flag: string) => {
    return authApi.post('/labs/verify-flag/', {
        lab_id: labId,
        flag: flag
      });
  },

  getLabStatus: async () => {
    return authApi.get('/labs/status/');
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

export default authApi;
