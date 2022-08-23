import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:5002/api',
  timeout: 1000,
});

export const login = async (data) => {
  try {
    return await apiClient.post('/auth/login', data);
  } catch (err) {
    return {
      error: true,
      err,
    };
  }
};

export const register = async (data) => {
  try {
    return await apiClient.post('/auth/register', data);
  } catch (err) {
    return {
      error: true,
      err,
    };
  }
};
