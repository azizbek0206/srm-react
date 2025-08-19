import axios from 'axios';
import { getToken } from './auth';

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: `${API_URL}/courses/`,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getCourses = async (page = 1, search = '', ordering = '') => {
  try {
    const response = await api.get('', {
      params: { page, search, ordering, page_size: 20 },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { detail: 'Failed to fetch courses' };
  }
};

export const createCourse = async (data) => {
  try {
    const response = await api.post('', data);
    return response.data;
  } catch (error) {
    throw error.response?.data || { detail: 'Failed to create course' };
  }
};

export const updateCourse = async (id, data) => {
  try {
    const response = await api.put(`${id}/`, data);
    return response.data;
  } catch (error) {
    throw error.response?.data || { detail: 'Failed to update course' };
  }
};

export const deleteCourse = async (id) => {
  try {
    await api.delete(`${id}/`);
  } catch (error) {
    throw error.response?.data || { detail: 'Failed to delete course' };
  }
};