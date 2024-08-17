// import React from 'react';


// const Funda = () => {
//   return (
//     <div>
//       <h1>Fundamental Analysis</h1>
//     </div>
//   );
// };

// export default Funda;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Chart, LineController, LineElement, PointElement, LinearScale, Title, CategoryScale } from 'chart.js';

// Chart.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale);

// const Funda = () => {
//   const [ticker, setTicker] = useState('');
//   const [stockData, setStockData] = useState(null);
//   const [error, setError] = useState(null);
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');
//   const [interval, setInterval] = useState('daily'); // State for time interval
//   const [selectedIndicators, setSelectedIndicators] = useState([]); // State for selected indicators

//   const handleSearch = async () => {
//     try {
//       const response = await axios.get(`https://api.example.com/stock/${ticker}`, {
//         params: {
//           startDate,
//           endDate,
//           interval,
//           indicators: selectedIndicators.join(',') // Passing the selected indicators to the API
//         }
//       });
//       setStockData(response.data);
//       setError(null);
//     } catch (error) {
//       setError('Stock data not found');
//       setStockData(null);
//     }
//   };

//   const toggleIndicator = (indicator) => {
//     setSelectedIndicators(prev =>
//       prev.includes(indicator)
//         ? prev.filter(item => item !== indicator)
//         : [...prev, indicator]
//     );
//   };

//   useEffect(() => {
//     if (stockData) {
//       const ctx = document.getElementById('stockChart').getContext('2d');
//       new Chart(ctx, {
//         type: 'line',
//         data: {
//           labels: stockData.historical.map(entry => entry.date),
//           datasets: [{
//             label: `${stockData.name} Stock Price`,
//             data: stockData.historical.map(entry => entry.close),
//             borderColor: 'rgba(75, 192, 192, 1)',
//             borderWidth: 2,
//             fill: false
//           }]
//         },
//         options: {
//           responsive: true,
//           scales: {
//             x: { type: 'time' },
//             y: { beginAtZero: false }
//           }
//         }
//       });
//     }
//   }, [stockData]);

//   return (
//     <div style={{ padding: '20px' }}>
//       <h1>Fundamental Analysis</h1>
      
//       {/* Stock Search Section */}
//       <div style={{ marginBottom: '20px', marginTop: '30px' }}>
//         <div style={{ marginBottom: '10px' }}>
//           <label htmlFor="ticker" style={{ marginRight: '10px' }}>Stock Symbol:</label>
//           <input 
//             type="text" 
//             id="ticker"
//             value={ticker} 
//             onChange={(e) => setTicker(e.target.value)} 
//             placeholder="Enter stock ticker..." 
//             style={{
//               padding: '10px',
//               marginRight: '10px',
//               width: '200px',
//               borderRadius: '4px',
//               border: '1px solid #ccc'
//             }}
//           />
//         </div>
//       </div>

//       {/* Time Interval Section */}
//       <div style={{ marginBottom: '20px' }}>
//         <h3 style={{ color: '#007bff', paddingBottom: '10px' }}>Time Interval</h3>
//         <div style={{ marginBottom: '10px' }}>
//           <label htmlFor="interval" style={{ marginRight: '10px' }}>Select Interval:</label>
//           <select 
//             id="interval"
//             value={interval}
//             onChange={(e) => setInterval(e.target.value)}
//             style={{
//               padding: '10px',
//               borderRadius: '4px',
//               border: '1px solid #ccc'
//             }}
//           >
//             <option value="minutes">Minutes</option>
//             <option value="hourly">Hourly</option>
//             <option value="daily">Daily</option>
//             <option value="weekly">Weekly</option>
//           </select>
//         </div>
//       </div>

//       {/* Fundamental Indicators Section */}
//       <div style={{ marginBottom: '20px' }}>
//         <h3 style={{ color: '#007bff', paddingBottom: '10px' }}>Fundamental Indicators</h3>
//         <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
//           {['(P/E) Ratio', 'ESP', 'ROE', '(D/E) Ratio'].map(option => (
//             <button
//               key={option}
//               onClick={() => toggleIndicator(option)}
//               style={{
//                 padding: '10px 20px',
//                 borderRadius: '4px',
//                 border: '1px solid #007BFF',
//                 backgroundColor: selectedIndicators.includes(option) ? '#007BFF' : 'white',
//                 color: selectedIndicators.includes(option) ? 'white' : '#007BFF',
//                 cursor: 'pointer',
//                 transition: 'background-color 0.3s'
//               }}
//             >
//               {option}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Date Picker Section */}
//       <div style={{ marginBottom: '20px' }}>
//         <h3 style={{ color: '#007bff', paddingBottom: '10px' }}>Date Range</h3>
//         <div style={{ marginBottom: '10px' }}>
//           <label htmlFor="startDate" style={{ marginRight: '10px' }}>Start Date:</label>
//           <input 
//             type="date" 
//             id="startDate" 
//             value={startDate} 
//             onChange={(e) => setStartDate(e.target.value)} 
//             style={{
//               padding: '10px',
//               borderRadius: '4px',
//               border: '1px solid #ccc'
//             }}
//           />
//         </div>
//         <div>
//           <label htmlFor="endDate" style={{ marginRight: '10px' }}>End Date:</label>
//           <input 
//             type="date" 
//             id="endDate" 
//             value={endDate} 
//             onChange={(e) => setEndDate(e.target.value)} 
//             style={{
//               padding: '10px',
//               borderRadius: '4px',
//               border: '1px solid #ccc'
//             }}
//           />
//         </div>
//       </div>
      
//       {/* Search Button */}
//       <div style={{ marginBottom: '20px' }}>
//         <button 
//           onClick={handleSearch} 
//           style={{
//             padding: '10px 20px',
//             borderRadius: '4px',
//             backgroundColor: '#007BFF',
//             color: 'white',
//             border: 'none',
//             cursor: 'pointer',
//             fontSize: '30px'
//           }}
//         >
//           GO
//         </button>
//       </div>

//       {/* Chart Section */}
//       {stockData && (
//         <div>
//           <canvas id="stockChart" width="400" height="200"></canvas>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Funda;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Chart, LineController, LineElement, PointElement, LinearScale, Title, CategoryScale } from 'chart.js';
// import './funda.css'

// Chart.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale);

// const Funda = () => {
//   const [ticker, setTicker] = useState('');
//   const [stockData, setStockData] = useState(null);
//   const [error, setError] = useState(null);
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');
//   const [interval, setInterval] = useState('daily'); // State for time interval
//   const [selectedIndicators, setSelectedIndicators] = useState([]); // State for selected indicators

//   const handleSearch = async () => {
//     console.log('Search button clicked'); // Check if this logs
//     try {
//       const response = await axios.get(`https://api.example.com/stock/${ticker}`, {
//         params: {
//           startDate,
//           endDate,
//           interval,
//           indicators: selectedIndicators.join(',') // Passing the selected indicators to the API
//         }
//       });
//       setStockData(response.data);
//       setError(null);
//     } catch (error) {
//       setError('Stock data not found');
//       setStockData(null);
//     }
//   };

//   const toggleIndicator = (indicator) => {
//     setSelectedIndicators(prev =>
//       prev.includes(indicator)
//         ? prev.filter(item => item !== indicator)
//         : [...prev, indicator]
//     );
//   };

//   useEffect(() => {
//     if (stockData && stockData.historical) {
//       const ctx = document.getElementById('stockChart').getContext('2d');
//       new Chart(ctx, {
//         type: 'line',
//         data: {
//           labels: stockData.historical.map(entry => entry.date),
//           datasets: [{
//             label: `${stockData.name} Stock Price`,
//             data: stockData.historical.map(entry => entry.close),
//             borderColor: 'rgba(75, 192, 192, 1)',
//             borderWidth: 2,
//             fill: false
//           }]
//         },
//         options: {
//           responsive: true,
//           scales: {
//             x: { type: 'time' },
//             y: { beginAtZero: false }
//           }
//         }
//       });
//     }
//   }, [stockData]);

//   return (
//     <div style={{ padding: '20px' }}>
//       <h1>Fundamental Analysis</h1>
      
//       {/* Stock Search Section */}
//       <div style={{ marginBottom: '20px', marginTop: '30px' }}>
//         <div style={{ marginBottom: '10px' }}>
//           <label htmlFor="ticker" style={{ marginRight: '10px' }}>Stock Symbol:</label>
//           <input 
//             type="text" 
//             id="ticker"
//             value={ticker} 
//             onChange={(e) => setTicker(e.target.value)} 
//             placeholder="Enter stock ticker..." 
//             style={{
//               padding: '10px',
//               marginRight: '10px',
//               width: '200px',
//               borderRadius: '4px',
//               border: '1px solid #ccc'
//             }}
//           />
//         </div>
//       </div>

//       {/* Time Interval Section */}
//       <div style={{ marginBottom: '20px' }}>
//         <h3 style={{ color: '#007bff', paddingBottom: '10px' }}>Time Interval</h3>
//         <div style={{ marginBottom: '10px' }}>
//           <label htmlFor="interval" style={{ marginRight: '10px' }}>Select Interval:</label>
//           <select 
//             id="interval"
//             value={interval}
//             onChange={(e) => setInterval(e.target.value)}
//             style={{
//               padding: '10px',
//               borderRadius: '4px',
//               border: '1px solid #ccc'
//             }}
//           >
//             <option value="minutes">Minutes</option>
//             <option value="hourly">Hourly</option>
//             <option value="daily">Daily</option>
//             <option value="weekly">Weekly</option>
//           </select>
//         </div>
//       </div>

//       {/* Fundamental Indicators Section */}
//       <div style={{ marginBottom: '20px' }}>
//         <h3 style={{ color: '#007bff', paddingBottom: '10px' }}>Fundamental Indicators</h3>
//         <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
//           {['(P/E) Ratio', 'ESP', 'ROE', '(D/E) Ratio'].map(option => (
//             <button
//               key={option}
//               onClick={() => toggleIndicator(option)}
//               style={{
//                 padding: '10px 20px',
//                 borderRadius: '4px',
//                 border: '1px solid #007BFF',
//                 backgroundColor: selectedIndicators.includes(option) ? '#007BFF' : 'white',
//                 color: selectedIndicators.includes(option) ? 'white' : '#007BFF',
//                 cursor: 'pointer',
//                 transition: 'background-color 0.3s',
//                 outline: 'none' // Ensure no outline is visible when clicked
//               }}
//             >
//               {option}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Date Picker Section */}
//       <div style={{ marginBottom: '20px' }}>
//         <h3 style={{ color: '#007bff', paddingBottom: '10px' }}>Date Range</h3>
//         <div style={{ marginBottom: '10px' }}>
//           <label htmlFor="startDate" style={{ marginRight: '10px' }}>Start Date:</label>
//           <input 
//             type="date" 
//             id="startDate" 
//             value={startDate} 
//             onChange={(e) => setStartDate(e.target.value)} 
//             style={{
//               padding: '10px',
//               borderRadius: '4px',
//               border: '1px solid #ccc'
//             }}
//           />
//         </div>
//         <div>
//           <label htmlFor="endDate" style={{ marginRight: '10px' }}>End Date:</label>
//           <input 
//             type="date" 
//             id="endDate" 
//             value={endDate} 
//             onChange={(e) => setEndDate(e.target.value)} 
//             style={{
//               padding: '10px',
//               borderRadius: '4px',
//               border: '1px solid #ccc'
//             }}
//           />
//         </div>
//       </div>
      
//       {/* Search Button */}
//       <div style={{ marginBottom: '20px' }}>
//         <button 
//           onClick={handleSearch} 
//           style={{
//             padding: '10px 20px',
//             borderRadius: '4px',
//             backgroundColor: '#007BFF',
//             color: 'white',
//             border: 'none',
//             cursor: 'pointer',
//             fontSize: '30px'
//           }}
//         >
//           GO
//         </button>
//       </div>

//       {/* Chart Section */}
//       {stockData && (
//         <div>
//           <canvas id="stockChart" width="400" height="200"></canvas>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Funda;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Chart, LineController, LineElement, PointElement, LinearScale, Title, CategoryScale } from 'chart.js';
import './funda.css'; // Import the CSS file

Chart.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale);

const Funda = () => {
  const [ticker, setTicker] = useState('');
  const [stockData, setStockData] = useState(null);
  const [error, setError] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [interval, setInterval] = useState('daily');
  const [selectedIndicators, setSelectedIndicators] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`https://api.example.com/stock/${ticker}`, {
        params: {
          startDate,
          endDate,
          interval,
          indicators: selectedIndicators.join(',')
        }
      });
      setStockData(response.data);
      setError(null);
    } catch (error) {
      setError('Stock data not found');
      setStockData(null);
    }
  };

  const toggleIndicator = (indicator) => {
    setSelectedIndicators(prev =>
      prev.includes(indicator)
        ? prev.filter(item => item !== indicator)
        : [...prev, indicator]
    );
  };

  useEffect(() => {
    if (stockData && stockData.historical) {
      const ctx = document.getElementById('stockChart').getContext('2d');
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: stockData.historical.map(entry => entry.date),
          datasets: [{
            label: `${stockData.name} Stock Price`,
            data: stockData.historical.map(entry => entry.close),
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 2,
            fill: false
          }]
        },
        options: {
          responsive: true,
          scales: {
            x: { type: 'time' },
            y: { beginAtZero: false }
          }
        }
      });
    }
  }, [stockData]);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Fundamental Analysis</h1>
      
      <div style={{ marginBottom: '20px', marginTop: '30px' }}>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="ticker" style={{ marginRight: '10px' }}>Stock Symbol:</label>
          <input 
            type="text" 
            id="ticker"
            value={ticker} 
            onChange={(e) => setTicker(e.target.value)} 
            placeholder="Enter stock ticker..." 
            style={{
              padding: '10px',
              marginRight: '10px',
              width: '200px',
              borderRadius: '4px',
              border: '1px solid #ccc'
            }}
          />
        </div>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ color: '#007bff', paddingBottom: '10px' }}>Time Interval</h3>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="interval" style={{ marginRight: '10px' }}>Select Interval:</label>
          <select 
            id="interval"
            value={interval}
            onChange={(e) => setInterval(e.target.value)}
            style={{
              padding: '10px',
              borderRadius: '4px',
              border: '1px solid #ccc'
            }}
          >
            <option value="minutes">Minutes</option>
            <option value="hourly">Hourly</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
          </select>
        </div>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ color: '#007bff', paddingBottom: '10px' }}>Fundamental Indicators</h3>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {['(P/E) Ratio', 'ESP', 'ROE', '(D/E) Ratio'].map(option => (
            <button
              key={option}
              onClick={() => toggleIndicator(option)}
              className={`button ${selectedIndicators.includes(option) ? 'active' : ''}`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ color: '#007bff', paddingBottom: '10px' }}>Date Range</h3>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="startDate" style={{ marginRight: '10px' }}>Start Date:</label>
          <input 
            type="date" 
            id="startDate" 
            value={startDate} 
            onChange={(e) => setStartDate(e.target.value)} 
            style={{
              padding: '10px',
              borderRadius: '4px',
              border: '1px solid #ccc'
            }}
          />
        </div>
        <div>
          <label htmlFor="endDate" style={{ marginRight: '10px' }}>End Date:</label>
          <input 
            type="date" 
            id="endDate" 
            value={endDate} 
            onChange={(e) => setEndDate(e.target.value)} 
            style={{
              padding: '10px',
              borderRadius: '4px',
              border: '1px solid #ccc'
            }}
          />
        </div>
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={handleSearch} 
          style={{
            padding: '10px 20px',
            borderRadius: '4px',
            backgroundColor: '#007BFF',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            fontSize: '30px'
          }}
        >
          GO
        </button>
      </div>

      {stockData && (
        <div>
          <canvas id="stockChart" width="400" height="200"></canvas>
        </div>
      )}
    </div>
  );
};

export default Funda;

