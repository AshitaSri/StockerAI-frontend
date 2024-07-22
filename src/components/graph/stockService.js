import axios from 'axios';

const API_KEY = 'AYIKOS9O483UQ6AL';
const BASE_URL = 'https://www.alphavantage.co/query';

export const getStockData = (symbol, interval) => {
  const functionType = interval === 'daily' || interval === 'weekly' || interval === 'monthly'
    ? `TIME_SERIES_${interval.toUpperCase()}`
    : 'TIME_SERIES_INTRADAY';

  return axios.get(BASE_URL, {
    params: {
      function: functionType,
      symbol: symbol,
      interval: interval === 'minute' ? '1min' : undefined,
      apikey: API_KEY,
    },
  });
};
