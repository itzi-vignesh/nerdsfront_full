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

    // Ensure we're not sending any security headers
    const securityHeaders = [
      'x-content-type-options',
      'x-frame-options',
      'x-xss-protection',
      'referrer-policy',
      'content-security-policy',
      'strict-transport-security'
    ];
    
    securityHeaders.forEach(header => {
      if (config.headers[header]) {
        delete config.headers[header];
      }
    });
    
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

// Auth API endpoints stay on Server 1
export const authAPI = {
  login: async (username: string, password: string) => {
    try {
      // Return the full response, not just the data
      const response = await authApi.post('/auth/login/', { username, password });
      return response;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },
  
  logout: async () => {
    const response = await authApi.post('/auth/logout/');
    return response.data;
  },
  
  register: async (username: string, email: string, password: string, password2: string, first_name: string, last_name: string) => {
    // Ensure all required fields are provided
    const userData = {
      username,
      email, 
      password, 
      password2,
      first_name,
      last_name
    };
    
    // Return the full response with the token
    const response = await authApi.post('/auth/register/', userData);
    return response;
  },
  
  getProfile: async () => {
    const response = await authApi.get('/auth/me/');
    return response;
  },
  
  changePassword: async (currentPassword: string, newPassword: string, newPasswordConfirm: string) => {
    const response = await authApi.post('/auth/change-password/', {
      current_password: currentPassword,
      new_password: newPassword,
      new_password_confirm: newPasswordConfirm
    });
    return response.data;
  },

  forgotPassword: async (email: string) => {
    const response = await authApi.post('/auth/forgot-password/', { email });
    return response.data;
  },

  resetPassword: async (token: string, password: string, password2: string) => {
    const response = await authApi.post('/auth/reset-password/', { token, password, password2 });
    return response;
  },

  verifyEmail: async (token: string) => {
    const response = await authApi.post('/auth/verify-email/', { token });
    return response;
  },

  resendVerification: async (email: string) => {
    const response = await authApi.post('/auth/resend-verification/', { email });
    return response.data;
  }
};

// Map lab IDs to their corresponding lab.nerdslab.in IDs
const LAB_ID_MAP: Record<string, string> = {
  'mediconnect-lab': 'lab1',
  'feedme-lab': 'lab2'
};

// Labs API endpoints now point to lab.nerdslab.in
export const labsAPI = {
  getTemplates: async () => {
    // Return mock data for labs
    return [
      {
        id: "mediconnect-lab",
        track_id: "track-1",
        module_id: "module-1",
        title: "MediConnect Web Application Security",
        description: "Practice web security testing on a medical records management system. Learn to identify and exploit vulnerabilities in a healthcare application while understanding the importance of securing sensitive medical data.",
        difficulty: "medium",
        category: "Web Security",
        estimated_minutes: 90,
        points_awarded: 250,
        lab_type: "docker",
        docker_image: "lab1-image"
      },
      {
        id: "feedme-lab",
        track_id: "track-1",
        module_id: "module-1",
        title: "FeedMe XSS Challenge",
        description: "Practice Cross-Site Scripting (XSS) vulnerabilities on a food ordering application. Learn to identify and exploit XSS vulnerabilities while understanding the importance of input validation and output encoding.",
        difficulty: "medium",
        category: "Web Security",
        estimated_minutes: 60,
        points_awarded: 200,
        lab_type: "docker",
        docker_image: "nerdslab/lab2"
      }
    ];
  },
  
  getLab: async (labId: string) => {
    // Return mock data for labs
    if (labId === 'mediconnect-lab') {
      return {
        id: "mediconnect-lab",
        track_id: "track-1",
        module_id: "module-1",
        title: "MediConnect Web Application Security",
        description: "Practice web security testing on a medical records management system. Learn to identify and exploit vulnerabilities in a healthcare application while understanding the importance of securing sensitive medical data.",
        difficulty: "medium",
        category: "Web Security",
        estimated_minutes: 90,
        points_awarded: 250,
        lab_type: "docker",
        docker_image: "lab1-image",
        status: "available"
      };
    }
    if (labId === 'feedme-lab') {
      return {
        id: "feedme-lab",
        track_id: "track-1",
        module_id: "module-1",
        title: "FeedMe XSS Challenge",
        description: "Practice Cross-Site Scripting (XSS) vulnerabilities on a food ordering application. Learn to identify and exploit XSS vulnerabilities while understanding the importance of input validation and output encoding.",
        difficulty: "medium",
        category: "Web Security",
        estimated_minutes: 60,
        points_awarded: 200,
        lab_type: "docker",
        docker_image: "nerdslab/lab2",
        status: "available"
      };
    }
    throw new Error('Lab not found');
  },
  
  createLabInstance: async (labId: string) => {
    try {
      const userHash = localStorage.getItem('user_hash');
      if (!userHash) {
        // Try to regenerate the hash from user data
        const userData = JSON.parse(localStorage.getItem('user') || '{}');
        if (!userData.id || !userData.username) {
          throw new Error('User data not found. Please log in again.');
        }
        
        // Generate a new hash
        const generateHash = (userId: string | number, username: string): string => {
          const data = `${userId}:${username}:${Date.now()}`;
          let hash = 0;
          for (let i = 0; i < data.length; i++) {
            const char = data.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
          }
          return Math.abs(hash).toString(36);
        };
        
        const newHash = generateHash(userData.id, userData.username);
        localStorage.setItem('user_hash', newHash);
      }

      // Map the lab ID to the correct lab.nerdslab.in ID
      const mappedLabId = LAB_ID_MAP[labId];
      if (!mappedLabId) {
        throw new Error('Invalid lab ID');
      }

      const response = await fetch('/api/labs/start/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          lab_id: mappedLabId,
          user_hash: userHash
        })
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 400 && data.error === 'Lab session already exists for this user') {
          throw new Error('You already have a lab session running. Please stop it before starting a new one.');
        }
        throw new Error(data.error || 'Failed to start lab session');
      }

      return {
        status: 'success',
        lab_id: labId,
        url: data.url,
        message: data.message,
        container_created: true
      };
    } catch (error) {
      console.error('Error creating lab instance:', error);
      throw error;
    }
  },
  
  stopLab: async (labId: string) => {
    try {
      const userHash = localStorage.getItem('user_hash');
      if (!userHash) {
        throw new Error('User hash not found');
      }

      // Map the lab ID to the correct lab.nerdslab.in ID
      const mappedLabId = LAB_ID_MAP[labId];
      if (!mappedLabId) {
        throw new Error('Invalid lab ID');
      }

      const response = await fetch('/api/labs/stop/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          lab_id: mappedLabId,
          user_hash: userHash
        })
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('No active lab session found');
        }
        throw new Error(data.error || 'Failed to stop lab session');
      }

      return {
        status: 'success',
        message: data.message
      };
    } catch (error) {
      console.error('Error stopping lab:', error);
      throw error;
    }
  },
  
  restartLab: async (labId: string) => {
    try {
      // First stop the lab
      await labsAPI.stopLab(labId);
      
      // Then start it again
      return await labsAPI.createLabInstance(labId);
    } catch (error) {
      console.error('Error restarting lab:', error);
      throw error;
    }
  },

  verifyFlag: async (labId: string, flag: string) => {
    try {
      const response = await labApi.post('/labs/verify-flag/', {
        lab_id: labId,
        flag: flag
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getLabStatus: async () => {
    try {
      const response = await labApi.get('/labs/status/');
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

// Helper function to create demo lab response
function createDemoLabResponse(labId: string, hostIp: string = '172.22.160.1') {
  // Special handling for mediconnect lab
  if (labId === 'mediconnect-lab') {
    return {
      status: 'success',
      lab_id: labId,
      url: 'https://lab2.nerdslab.in/',
      message: 'MediConnect lab instance created successfully.',
      container_created: true
    };
  }

  // Generate a strong random hash (not easily guessable by humans)
  const generateRandomHash = (length: number) => {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    const randomValues = new Uint32Array(length);
    window.crypto.getRandomValues(randomValues);
    for (let i = 0; i < length; i++) {
      result += chars[randomValues[i] % chars.length];
    }
    return result;
  };

  // Extract lab name for use in domain
  const labName = labId.includes('-') ? labId.split('-')[0] : labId;
  
  // Generate a random string for the subdomain
  const randomString = generateRandomHash(8);
  
  // Format: <lab_name>-<randomized_string>.labs.nerdslab.in
  const labDomain = `${labName}-${randomString}.labs.nerdslab.in`;
  
  // Create URLs according to required format
  const domainUrl = `https://${labDomain}`;
  
  // Also provide a direct IP URL as backup
  const portNumber = 8080 + Math.floor(Math.random() * 100); // Randomize port 8080-8179
  const ipBasedUrl = `http://${hostIp}:${portNumber}`;
  
  return {
    status: 'success',
    lab_id: labId,
    url: domainUrl,
    direct_ip_url: ipBasedUrl,
    message: 'Lab container created successfully. Use direct IP access if DNS fails.',
    container_created: true
  };
}

export default authApi;
