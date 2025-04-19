import React from 'react';
import './Favorites.scss';
import { Link } from 'react-router-dom';

function Favorites({ favoritedPets  }) {
  return (
    <div className='fav-container'>
        <h1 className='fav-title'>Favorites</h1>
        {favoritedPets.map((pet) => (
        <Link to={`/adopt/${pet.animalID}`} state={{ pet }}>
            <div className="fav-item" key={pet.animalID}>
                <h1 className='pet-name'>{pet.name}</h1>
                <img src="/rightpaw.png" alt="Pawprint" className="paw-icon" />
            </div>
        </Link>
        
      ))}
    </div>
  );
}

export default Favorites;
