import React from 'react';
import Chatbox from './components/chatbox/Chatbox';
import './App.css';

function App() {
  return (
    <div>
      <header >
        <h1>Stock Market Chatbox</h1>
      </header>
      <main>
        <Chatbox />
      </main>
    </div>
  );
}

export default App;
