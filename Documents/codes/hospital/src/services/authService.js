import api from './api';

export const loginUser = async (credentials) => {
  const response = await api.post('/auth/login', credentials);
  return response.data; // Expected: { user, token }
};

export const logoutUser = async () => {
  return await api.post('/auth/logout');
};