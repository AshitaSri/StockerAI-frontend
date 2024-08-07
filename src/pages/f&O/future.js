import React, { useState } from 'react';
import './future.css';

const Future = () => {
  const [positions, setPositions] = useState([]);
  const [index, setIndex] = useState('banknifty');
  const [segment, setSegment] = useState('futures');
  const [optionType, setOptionType] = useState('call');
  const [actionType, setActionType] = useState('buy');
  const [strikePrice, setStrikePrice] = useState('ATM');
  const [totalLot, setTotalLot] = useState(1);
  const [expiryType, setExpiryType] = useState('weekly');
  // const [entryPrice, setEntryPrice] = useState('');
  const [stopLoss, setStopLoss] = useState('');
  const [target, setTarget] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleAddPosition = () => {
    const newPosition = {
      index,
      segment,
      optionType,
      actionType,
      strikePrice,
      totalLot,
      expiryType,
      // entryPrice,
      stopLoss,
      target,
    };
    setPositions([...positions, newPosition]);
  };

  const handleBacktest = async () => {
    try {
      const response = await fetch('/api/backtest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          positions,
          startDate,
          endDate,
        }),
      });
      const result = await response.json();
      console.log('Backtest result:', result);
      // Handle displaying the result to the user
    } catch (error) {
      console.error('Backtest error:', error);
    }
  };

  const generateStrikePriceOptions = () => {
    const options = ['ATM'];
    for (let i = 100; i <= 2000; i += 100) {
      options.push(`ATM+${i}`);
      options.push(`ATM-${i}`);
    }
    options.sort((a, b) => {
      const numA = a.includes('ATM+') ? parseInt(a.split('+')[1]) : a.includes('ATM-') ? -parseInt(a.split('-')[1]) : 0;
      const numB = b.includes('ATM+') ? parseInt(b.split('+')[1]) : b.includes('ATM-') ? -parseInt(b.split('-')[1]) : 0;
      return numA - numB;
    });
    return options;
  };

  const handleDeletePosition = (index) => {
    const updatedPositions = positions.filter((_, i) => i !== index);
    setPositions(updatedPositions);
  };

  return (
    <div className="future-container">
      <h2 className="header">POSITIONS</h2>
      <div className="option-selector">
        <label className="radio-label">
          <input type="radio" name="atmOption" value="atmPoint" defaultChecked />
          ATM Point
        </label>
      </div>
      <div className="horizontal-layout">
        <div className="form-group">
          <label className="label">Select Index:</label>
          <select value={index} onChange={(e) => setIndex(e.target.value)} className="select">
            <option value="banknifty">Banknifty</option>
            <option value="nifty">Nifty</option>
          </select>
        </div>
        <div className="form-group">
          <label className="label">Select Segment:</label>
          <div className="button-group">
            <button className={segment === 'futures' ? 'button active' : 'button'} onClick={() => setSegment('futures')}>Futures</button>
            <button className={segment === 'options' ? 'button active' : 'button'} onClick={() => setSegment('options')}>Options</button>
          </div>
        </div>
        <div className="form-group">
          <label className="label">Option Type:</label>
          <div className="button-group">
            <button className={optionType === 'call' ? 'button active' : 'button'} onClick={() => setOptionType('call')}>Call</button>
            <button className={optionType === 'put' ? 'button active' : 'button'} onClick={() => setOptionType('put')}>Put</button>
          </div>
        </div>
        <div className="form-group">
          <label className="label">Action Type:</label>
          <div className="button-group">
            <button className={actionType === 'buy' ? 'button active' : 'button'} onClick={() => setActionType('buy')}>Buy</button>
            <button className={actionType === 'sell' ? 'button active' : 'button'} onClick={() => setActionType('sell')}>Sell</button>
          </div>
        </div>
        <div className="form-group">
          <label className="label">Strike Price:</label>
          <select value={strikePrice} onChange={(e) => setStrikePrice(e.target.value)} className="select">
            {generateStrikePriceOptions().map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label className="label">Total Lot:</label>
          <input type="number" value={totalLot} onChange={(e) => setTotalLot(Number(e.target.value))} className="input" min="1" />
        </div>
        <div className="form-group">
          <label className="label">Expiry Type:</label>
          <select value={expiryType} onChange={(e) => setExpiryType(e.target.value)} className="select">
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
        {/* <div className="form-group">
          <label className="label">Entry Price:</label>
          <input type="number" value={entryPrice} onChange={(e) => setEntryPrice(e.target.value)} className="input" />
        </div> */}
        <div className="form-group">
          <label className="label">Stop Loss:</label>
          <input type="number" value={stopLoss} onChange={(e) => setStopLoss(e.target.value)} className="input" />
        </div>
        <div className="form-group">
          <label className="label">Target:</label>
          <input type="number" value={target} onChange={(e) => setTarget(e.target.value)} className="input" />
        </div>
      </div>
      <button onClick={handleAddPosition} className="add-button">Add Position</button>
      
      <div className="positions-section">
        <h3>Added Positions</h3>
        {positions.length > 0 ? (
          <ul className="positions-list">
            {positions.map((position, index) => (
              <li key={index} className="position-item">
                <div className="position-details">
                  <span><strong>{position.index} - {position.segment} - {position.optionType} - {position.actionType}</strong></span>
                  <span>Strike: {position.strikePrice}, Lots: {position.totalLot}</span>
                  <span>Expiry: {position.expiryType}</span>
                  <span>Stop Loss: {position.stopLoss || 'N/A'}, Target: {position.target || 'N/A'}</span>
                </div>
                <button onClick={() => handleDeletePosition(index)} className="delete-button">Delete</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No positions added yet.</p>
        )}
      </div>
      
      <div className="backtest-section">
        <h3>Backtest</h3>
        <div className="backtest-inputs">
          <div className="date-inputs">
            <div className="form-group">
              <label className="label">Start Date:</label>
              <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="input" />
            </div>
            <div className="form-group">
              <label className="label">End Date:</label>
              <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="input" />
            </div>
          </div>
          <button onClick={handleBacktest} className="backtest-button">Run Backtest</button>
        </div>
      </div>
    </div>
  );
};


export default Future;