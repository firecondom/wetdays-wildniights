import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_BASE = `${BACKEND_URL}/api`;

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds
});

// Response interceptor for consistent error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

// API Services
export const fireCondomAPI = {
  // Email signup
  async signup(signupData) {
    try {
      const response = await api.post('/signup', signupData);
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to join Fire Club. Please try again.';
      return {
        success: false,
        error: errorMessage
      };
    }
  },

  // Get all signups (admin)
  async getSignups() {
    try {
      const response = await api.get('/signups');
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to retrieve signups'
      };
    }
  },

  // Get products
  async getProducts() {
    try {
      const response = await api.get('/products');
      return {
        success: true,
        data: response.data.data
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to load products'
      };
    }
  },

  // Get all stores
  async getStores() {
    try {
      const response = await api.get('/stores');
      return {
        success: true,
        data: response.data.data
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to load store locations'
      };
    }
  },

  // Get stores by state
  async getStoresByState(state) {
    try {
      const response = await api.get(`/stores/${encodeURIComponent(state)}`);
      return {
        success: true,
        data: response.data.data
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to load store locations for this state'
      };
    }
  }
};

export default fireCondomAPI;