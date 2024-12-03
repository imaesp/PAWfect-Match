/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'; 
import './Card.scss';



function Card() {
  const [isGetStartedClicked, setGetStartedClicked] = useState(false);

  const navigate = useNavigate();
  const updateAction = () => {
    setGetStartedClicked(true);
    navigate('/survey'); 
  }

  return (
    <>
    <div className="col container" style={{  maxWidth: '320px'}}>

      {/* Row for Images */}
      <div className="row justify-content-center g-2" >
        <div className="col-auto">
          <div className="petsIMG">
            <img src="/pet_1.jpeg" alt="pet-1" />
          </div>
        </div>
        <div className="col-auto">
          <div className="petsIMG">
            <img src="/pet_2.jpeg" alt="pet-2" />
          </div>
        </div>
        <div className="col-auto">
          <div className="petsIMG">
            <img src="/pet_3.jpeg" alt="pet-3" />
          </div>
        </div>
      </div>

      {/* Row for Text and Action */}
      <div className="row flex-column align-items-center mt-3">
        <div className="col text-center" style={{ paddingBottom: '20px'}}>
          <h1>Find Your Match</h1>
          <p>By Taking the Quiz</p>
        </div>
      </div>

      {/* Call to Action */}
      <div className="row flex-column align-items-center mt-3">
        <div className="col text-center flex-container"  style={{ borderTop: '2px solid black', margin: '10px 0', width: '250px' }}>
          <p onClick={updateAction}>Get Started</p>
          <button className="btn questionnaire_arrow" onClick={updateAction}>
            <img style={{ width: '26px' }} src="/arrow_2.jpeg" className="img-fluid" alt="arrow to questionnaire" />
          </button>
        </div>
      </div>
    </div>
   </>
  );
}

export default Card;
