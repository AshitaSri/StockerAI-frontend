import React, { useState } from 'react';
import { Container, TextField, MenuItem, Button, CircularProgress, Typography, Paper, Box } from '@mui/material';
import StockChart from './StockChart';
import { getStockData } from './stockService';
import './graph.css';

function StockChartForm() {
  const [symbol, setSymbol] = useState('');
  const [interval, setInterval] = useState('minute');
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(false);

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
      const chartPrices = Object.values(data).map(entry => entry['1. open']).reverse();

      setChartData({
        labels: chartLabels,
        datasets: [
          {
            label: 'Price',
            data: chartPrices,
            fill: false,
            backgroundColor: 'rgba(75,192,192,0.6)',
            borderColor: 'rgba(75,192,192,1)',
          },
        ],
      });
    } catch (error) {
      console.error('Error fetching stock data:', error);
    } finally {
      setLoading(false);
    }
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
      <Box mt={4}>
        {loading ? <CircularProgress /> : <StockChart chartData={chartData} />}
      </Box>
    </Container>
  );
}

export default StockChartForm;
