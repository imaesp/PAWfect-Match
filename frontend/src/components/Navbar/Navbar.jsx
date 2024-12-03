import './Navbar.scss';
import Dropdown from './Dropdown';
import Login from '../../components/Login/Login';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import leftpaw from '/Users/saniapervez/Desktop/Pawfect Match/PAWfect-Match/frontend/src/assets/leftpaw.png';
import 'bootstrap/dist/css/bootstrap.min.css';


function Navbar() {
  return (
  <nav className="navbar">
  <div className="container text-center">
    <div className="row justify-content-between align-items-center">

      {/* Left Section */}
      <div className="col-auto d-flex align-items-center left-section">
        <img src={leftpaw} alt="PAWfect Match logo" className="paw-logo" />
        <Link to="/" className="nav-link name">PAWfect Match</Link>
      </div>

      {/* Middle Section */}
      <div className="col-auto mid">
        <div className="d-flex justify-content-center gap-1">
          <Link to="/article" className="navLinks">Pet EDU</Link>
          <Link to="/budget" className="navLinks">Budgeting Tool</Link>
          <Link to="/adopt" className="navLinks">Adopt</Link>
          <Link to="/survey" className="navLinks">Matchmaker</Link>
          <Link to="/about" className="navLinks">About</Link>
        </div>
      </div>

      {/* Right Section */}
      <div className="col-auto login">
          <Login />
      </div>

    </div>
  </div>
</nav>

  );
}

export default Navbar;