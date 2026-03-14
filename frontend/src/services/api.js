import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3001/products', // Backend URL
});

API.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['x-auth-token'] = token;
  }
  return config;
});

export const fetchProducts = () => API.get('/');
export const fetchProduct = (id) => API.get(`/${id}`); // Might 404 if not implemented on backend, we will handle it
export const createProduct = (product) => API.post('/', product);
export const updateProduct = (id, product) => API.put(`/${id}`, product);
export const deleteProduct = (id) => API.delete(`/${id}`);
