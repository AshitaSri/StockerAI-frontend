// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://your-api-url',
});

export const getStocks = async () => {
  try {
    const response = await api.get('/stocks');
    return response.data;
  } catch (error) {
    console.error('Error fetching stocks:', error);
    throw error;
  }
};
