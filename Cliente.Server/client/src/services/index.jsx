import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api/product',
});

export default api;
