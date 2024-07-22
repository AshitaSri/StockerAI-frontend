import React from 'react';
import Chatbox from './components/chatbox/Chatbox';
import './App.css';
import StockChartForm from './components/graph/StockChartForm';
function App() {
  return (
    <div className="App">
      <header>
        <h1>Stocker AI</h1>
      </header>
      <main className="main-content">
        <div className="content-container">
          <Chatbox />
          <StockChartForm />
        </div>
      </main>
    </div>
  );
}

export default App;
