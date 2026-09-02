import axios from 'axios';

// Detectar si estamos en localhost o en la red local
const hostname = window.location.hostname;
const API_BASE = hostname === 'localhost' || hostname === '127.0.0.1'
  ? 'http://localhost:3000/api'
  : `http://${hostname}:3000/api`;

const api = axios.create({
  baseURL: API_BASE,
});

// Interceptor para agregar el token JWT a cada request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para manejar errores de autenticación
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
