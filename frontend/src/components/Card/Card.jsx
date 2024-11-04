/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'; 
import './Card.scss';


function Card() {
  const [isGetStartedClicked, setGetStartedClicked] = useState(false);

  const navigate = useNavigate();
  const updateAction = () => {
    setGetStartedClicked(true);
    navigate('/questionnaire'); // will navigate to questionnaire
  }

  return (
    <div className="page-container">
      <div className="card-container">
        <div className="card-images">
          <img src="/pet_1.jpeg" alt="pet-1" />
          <img src="/pet_2.jpeg" alt="pet-2" />
          <img src="/pet_3.jpeg" alt="pet-3" />
        </div>

        <div className="card-text">
          <h1>Find your match</h1>
          <p>By filling out the questionnaire</p>
        </div>

        <div className="card-divider"></div>

        <div className="card-footer">
          <p>Get Started</p>
          <button className="questionnaire_arrow" onClick={updateAction}>
            <img src="/arrow_2.jpeg" alt="arrow to questionnaire" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;