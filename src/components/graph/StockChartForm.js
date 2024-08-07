import React, { useState } from 'react';
import { Container, TextField, MenuItem, Button, CircularProgress, Typography, Paper, Box } from '@mui/material';
import StockChart from './StockChart';
import { getStockData, calculateSMA, calculateEMA, calculateMACD, calculateRSI, calculateBollingerBands, calculateStochastic, calculateADX } from './stockService';
import './graph.css';

function StockChartForm() {
  const [symbol, setSymbol] = useState('');
  const [interval, setInterval] = useState('minute');
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedIndicators, setSelectedIndicators] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await getStockData(symbol, interval);
      const dataKey = interval === 'minute' ? 'Time Series (1min)' :
                      interval === 'hourly' ? 'Time Series (60min)' :
                      interval === 'daily' ? 'Time Series (Daily)' :
                      interval === 'weekly' ? 'Time Series (Weekly)' :
                      'Time Series (Monthly)';
      const data = response.data[dataKey];
      const chartLabels = Object.keys(data).reverse();
      const chartPrices = Object.values(data).map(entry => parseFloat(entry['1. open'])).reverse();
      const chartHighs = Object.values(data).map(entry => parseFloat(entry['2. high'])).reverse();
      const chartLows = Object.values(data).map(entry => parseFloat(entry['3. low'])).reverse();
      const chartCloses = Object.values(data).map(entry => parseFloat(entry['4. close'])).reverse();

      const datasets = [
        {
          label: 'Price',
          data: chartPrices,
          fill: false,
          backgroundColor: 'rgba(75,192,192,0.6)',
          borderColor: 'rgba(75,192,192,1)',
        },
      ];

      selectedIndicators.forEach(indicator => {
        if (indicator === 'SMA') {
          const smaData = calculateSMA(chartPrices, 14);
          datasets.push({
            label: 'SMA',
            data: smaData,
            fill: false,
            backgroundColor: 'rgba(255, 99, 132, 0.6)',
            borderColor: 'rgba(255, 99, 132, 1)',
          });
        } else if (indicator === 'EMA') {
          const emaData = calculateEMA(chartPrices, 14);
          datasets.push({
            label: 'EMA',
            data: emaData,
            fill: false,
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
            borderColor: 'rgba(54, 162, 235, 1)',
          });
        } else if (indicator === 'MACD') {
          const macdData = calculateMACD(chartCloses);
          datasets.push({
            label: 'MACD',
            data: macdData.map(entry => entry.MACD),
            fill: false,
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
          });
        } else if (indicator === 'RSI') {
          const rsiData = calculateRSI(chartCloses, 14);
          datasets.push({
            label: 'RSI',
            data: rsiData,
            fill: false,
            backgroundColor: 'rgba(153, 102, 255, 0.6)',
            borderColor: 'rgba(153, 102, 255, 1)',
          });
        } else if (indicator === 'Bollinger Bands') {
          const bollingerData = calculateBollingerBands(chartCloses, 14, 2);
          datasets.push({
            label: 'Bollinger Bands Upper',
            data: bollingerData.map(entry => entry.upper),
            fill: false,
            backgroundColor: 'rgba(255, 206, 86, 0.6)',
            borderColor: 'rgba(255, 206, 86, 1)',
          });
          datasets.push({
            label: 'Bollinger Bands Lower',
            data: bollingerData.map(entry => entry.lower),
            fill: false,
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
          });
        } else if (indicator === 'Stochastic') {
          const stochasticData = calculateStochastic(chartHighs, chartLows, chartCloses);
          datasets.push({
            label: 'Stochastic %K',
            data: stochasticData.map(entry => entry.k),
            fill: false,
            backgroundColor: 'rgba(255, 159, 64, 0.6)',
            borderColor: 'rgba(255, 159, 64, 1)',
          });
          datasets.push({
            label: 'Stochastic %D',
            data: stochasticData.map(entry => entry.d),
            fill: false,
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
            borderColor: 'rgba(54, 162, 235, 1)',
          });
        } else if (indicator === 'ADX') {
          const adxData = calculateADX(chartHighs, chartLows, chartCloses, 14);
          datasets.push({
            label: 'ADX',
            data: adxData,
            fill: false,
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
          });
        }
      });

      setChartData({
        labels: chartLabels,
        datasets: datasets,
      });
    } catch (error) {
      console.error('Error fetching stock data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleIndicatorClick = (indicator) => {
    setSelectedIndicators(prev => [...prev, indicator]);
  };

  return (
    <Container maxWidth="sm" className="App">
      <Typography variant="h3" component="h1" gutterBottom align="center">
        Live Stock Chart
      </Typography>
      <Paper elevation={3} className="form-container">
        <form onSubmit={handleSubmit}>
          <Box mb={2}>
            <TextField 
              label="Stock Symbol"
              variant="outlined"
              fullWidth
              value={symbol}
              onChange={(e) => setSymbol(e.target.value)}
              required
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="Interval"
              variant="outlined"
              fullWidth
              select
              value={interval}
              onChange={(e) => setInterval(e.target.value)}
            >
              <MenuItem value="minute">Minute</MenuItem>
              <MenuItem value="hourly">Hourly</MenuItem>
              <MenuItem value="daily">Daily</MenuItem>
              <MenuItem value="weekly">Weekly</MenuItem>
              <MenuItem value="monthly">Monthly</MenuItem>
            </TextField>
          </Box>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Submit
          </Button>
        </form>
      </Paper>
      <Box mt={2}>
        <Typography variant="h5" component="h2" gutterBottom>
          Select Indicators:
        </Typography>
        {['SMA', 'EMA', 'MACD', 'RSI', 'Bollinger Bands', 'Stochastic', 'ADX'].map((indicator) => (
          <Button
            key={indicator}
            variant="contained"
            color="primary"
            onClick={() => handleIndicatorClick(indicator)}
            disabled={selectedIndicators.includes(indicator)}
            style={{ margin: '0 10px 10px 0' }}
          >
            {indicator}
          </Button>
        ))}
      </Box>
      <Box mt={4}>
        {loading ? <CircularProgress /> : <StockChart chartData={chartData} />}
      </Box>
    </Container>
  );
}

export default StockChartForm;