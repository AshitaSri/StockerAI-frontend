import React, { useState } from 'react';
import StockChartForm from '../../components/graph/StockChartForm';
import { Container } from '@mui/material';
import { getTechnicalIndicatorData } from '../../components/graph/stockService';

const Tech = () => {
  const [selectedIndicators, setSelectedIndicators] = useState([]);
  const [indicatorData, setIndicatorData] = useState({});

  const handleIndicatorClick = async (indicator) => {
    if (selectedIndicators.includes(indicator)) {
      // Remove indicator
      setSelectedIndicators((prevIndicators) => prevIndicators.filter((ind) => ind !== indicator));
      setIndicatorData((prevData) => {
        const newData = { ...prevData };
        delete newData[indicator];
        return newData;
      });
    } else {
      // Add indicator
      try {
        const symbol = 'AAPL'; // Replace with the stock symbol from your form
        const response = await getTechnicalIndicatorData(symbol, indicator);
        const data = response.data[`Technical Analysis: ${indicator}`];
        setIndicatorData((prevData) => ({ ...prevData, [indicator]: data }));
        setSelectedIndicators((prevIndicators) => [...prevIndicators, indicator]);
      } catch (error) {
        console.error(`Error fetching ${indicator} data:`, error);
      }
    }
  };

  const fetchIndicatorData = async (symbol, indicator) => {
    if (!indicatorData[indicator]) {
      const response = await getTechnicalIndicatorData(symbol, indicator);
      const data = response.data[`Technical Analysis: ${indicator}`];
      setIndicatorData((prevData) => ({ ...prevData, [indicator]: data }));
    }
  };

  return (
    <Container maxWidth="lg">
      <h1>Technical Analysis Page</h1>
      <StockChartForm 
        indicatorData={indicatorData} 
        selectedIndicators={selectedIndicators} 
        onIndicatorClick={handleIndicatorClick} 
        onFetchIndicatorData={fetchIndicatorData} 
      />
    </Container>
  );
};

export default Tech;
