import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'https://api.sarahcare.com/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach token to outgoing requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('sarah_care_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;