import React from "react";
import "./LandingSection.scss"; // Import the SCSS file
import Card from "../../components/Card/Card";

const LandingSection = () => {
  return (
    <div className="landing-container">
      <div className="text-section">
        <h1 className="heading">Your PAWfect pet awaits.</h1>
        <p className="sub-text">
          We aim to create lifelong bonds between pets and their owners by
          providing a personalized matchmaking service.
        </p>
      </div>
      <Card className='card'></Card>
    </div>
  );
};

export default LandingSection;

