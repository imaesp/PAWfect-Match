import './Navbar.scss';
import Login from '../../components/Login/Login';
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { useUser } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

// {user} ? <Link to="/survey" className="navLinks">Matchmaker</Link> : <SignInButton mode="modal"> <Link className="navLinks">Matchmaker</Link> </SignInButton>

function Navbar() {

  const { user } = useUser();
  
  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <div className="row w-100 justify-content-between align-items-center">

          {/* Left Section */}
          <div className="col-auto d-flex align-items-center left-section">
            <img src='/leftpaw.png' alt="PAWfect Match logo" className="paw-logo" />
            <Link to="/" className="navLinks name">PAWfect Match</Link>
          </div>

          {/* Middle Section */}
          <div className="col-auto mid">
            <div className="d-flex justify-content-center flex-wrap gap-2">
              {user ? (
                <Link to="/survey" className="navLinks">Matchmaker</Link>
              ) : (
                <SignInButton mode="modal">
                  <span className="navLinks" role="button">Matchmaker</span>
                </SignInButton>
              )}
              <Link to="/adopt" className="navLinks">Adopt</Link>
              {user ? (
                <Link to="/budget" className="navLinks">Budgeting Tool</Link>
              ) : (
                <SignInButton mode="modal">
                  <span className="navLinks" role="button">Budgeting Tool</span>
                </SignInButton>
              )}
              <Link to='/checklist' className="navLinks">Checklist</Link>
              <Link to="/article" className="navLinks">Pet EDU</Link>
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
