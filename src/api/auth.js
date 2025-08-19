import axios from 'axios';

// Get API base URL from .env
const API_URL = import.meta.env.VITE_API_URL;

// Store token in localStorage
export const setToken = (token) => localStorage.setItem('token', token);
export const getToken = () => localStorage.getItem('token');
export const removeToken = () => localStorage.removeItem('token');

// Store user role in localStorage
export const setUserRole = (role) => localStorage.setItem('userRole', role);
export const getUserRole = () => localStorage.getItem('userRole');

// Axios instance with Authorization header
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Login to get JWT token
export const login = async (phone, password) => {
  try {
    const response = await api.post('/auth/token/', { phone, password });
    setToken(response.data.access);
    setUserRole(response.data.user.role); // Assuming backend returns user role
    return response.data;
  } catch (error) {
    throw error.response?.data || { detail: 'Login failed' };
  }
};

// Refresh token
export const refreshToken = async () => {
  try {
    const response = await api.post('/auth/token/refresh/', {
      refresh: localStorage.getItem('refreshToken'),
    });
    setToken(response.data.access);
    return response.data;
  } catch (error) {
    removeToken();
    throw error.response?.data || { detail: 'Token refresh failed' };
  }
};

// Logout
export const logout = () => {
  removeToken();
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('userRole');
};