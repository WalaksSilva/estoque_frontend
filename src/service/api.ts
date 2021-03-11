import axios from 'axios';

const request = axios.create({
  baseURL: 'https://localhost:44311/api/',
});

const api = {
  request,
};

export default api;