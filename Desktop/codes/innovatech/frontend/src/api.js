import axios from 'axios';

const API = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getServices = () => API.get('/services');
export const submitContact = (data) => API.post('/contact', data);

export default API;