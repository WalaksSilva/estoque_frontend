import axios from 'axios';
import { getToken } from "./auth";


const request = axios.create({
  // baseURL: 'https://localhost:44311/api/',
  baseURL: 'https://estoque-hml-api.azurewebsites.net/api/',
});

const api = {
  request,
};

request.interceptors.request.use(async config => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;