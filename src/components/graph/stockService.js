import axios from 'axios';
import { SMA, EMA, MACD, RSI, BollingerBands, Stochastic, ADX } from 'technicalindicators';

// const API_KEY = 'AYIKOS9O483UQ6AL';
const API_KEY = '8GVVIVY8T0CIOXOZ';
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

export const calculateSMA = (data, period) => {
  return SMA.calculate({ values: data, period: period });
};

export const calculateEMA = (data, period) => {
  return EMA.calculate({ values: data, period: period });
};

export const calculateMACD = (data) => {
  return MACD.calculate({
    values: data,
    fastPeriod: 12,
    slowPeriod: 26,
    signalPeriod: 9,
    SimpleMAOscillator: false,
    SimpleMASignal: false
  });
};

export const calculateRSI = (data, period) => {
  return RSI.calculate({ values: data, period: period });
};

export const calculateBollingerBands = (data, period, stdDev) => {
  return BollingerBands.calculate({
    values: data,
    period: period,
    stdDev: stdDev
  });
};

export const calculateStochastic = (high, low, close) => {
  return Stochastic.calculate({
    high: high,
    low: low,
    close: close,
    period: 14,
    signalPeriod: 3
  });
};

export const calculateADX = (high, low, close, period) => {
  return ADX.calculate({
    high: high,
    low: low,
    close: close,
    period: period
  });
};

export const getTechnicalIndicatorData = (symbol, indicator) => {
  return axios.get(BASE_URL, {
    params: {
      function: `TIME_SERIES_${indicator}`,
      symbol: symbol,
      apikey: API_KEY,
    },
  });
};
