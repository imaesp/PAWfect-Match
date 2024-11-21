import React from 'react';
import './NearYou.scss';

const NearYou = () => {
  return (
    <div className="pet-gallery">
      <h2>Pets Available Near You</h2>
      <div className="pet-cards">
        <div className="pet-card">
          <img src="src\components\NearYou\shooby-image.jpeg" alt="Shooby" />
          <div className="pet-name">Shooby</div>
        </div>
        <div className="pet-card">
          <img src="src\components\NearYou\dooby-image.jpeg" alt="Dooby" />
          <div className="pet-name">Dooby</div>
        </div>
        <div className="pet-card">
          <img src="src\components\NearYou\doo-image.avif" alt="Doo" />
          <div className="pet-name">Doo</div>
        </div>
      </div>
      <p>Meet the 9,000+ adoptable pets in your area!</p>
    </div>
  );
};

export default NearYou;
