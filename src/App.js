import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './pages/home/home';
import Tech from './pages/TechAnaly/Tech';
import Funda from './pages/fundaAnaly/funda';
import Future from './pages/f&O/future';

import Chatbox from './components/chatbox/Chatbox';
import Navbar from './components/navbar/navbar';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Chatbox />
        <main className="main-content">
          <div className="content-container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/f.a" element={<Funda />} />
              <Route path="/t.a" element={<Tech />} />
              <Route path="/f.o" element={<Future />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;
