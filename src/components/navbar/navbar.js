import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';  // Ensure this path is correct

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">StockerAI</div>
        <ul className="navbar-list">
          <li className="navbar-item"><Link to="/">Home</Link></li>
          <li className="navbar-item"><Link to="/f.a">Fundamental</Link></li>
          <li className="navbar-item"><Link to="/t.a">Technical</Link></li>
          <li className="navbar-item"><Link to="/f.o">F&O</Link></li>
        </ul>
        <button className="navbar-button">Login</button>
      </div>
    </nav>
  );
};

export default Navbar;
