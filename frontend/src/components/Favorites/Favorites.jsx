import React from 'react';
import './Favorites.scss';
import { Link } from 'react-router-dom';

function Favorites({ favoritedPets }) {
  return (
    <div className='fav-container'>
      <h1 className='fav-title'>Favorites</h1>
      
      {favoritedPets.length === 0 ? (
        <div className='no-favorites'>
          <p>Click the <span className="inline-heart"><img src="/heart.png" alt="heart" /></span></p>
          <p>On a pet card to add it to your favorites!</p>
        </div>
      ) : (
        favoritedPets.map((pet) => (
          <Link to={`/adopt/${pet.animalID}`} state={{ pet }} key={pet.animalID}>
            <div className="fav-item">
              <h1 className='pet-name'>{pet.name}</h1>
              <img src="/rightpaw.png" alt="Pawprint" className="paw-icon" />
            </div>
          </Link>
        ))
      )}
    </div>
  );
}

export default Favorites;
