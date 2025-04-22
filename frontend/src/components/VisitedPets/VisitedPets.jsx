import React from 'react'
import { Link } from 'react-router-dom'
import './VisitedPets.scss'

function VisitedPets({visitedPets, handleClearVisitedHistory}) {
  return (
    <div className='fav-container'>
      <h1 className='fav-title'>Visited</h1>

      <div className='fav-content'>
        {visitedPets.length === 0 ? (
          <div className='no-favorites'>
            <p>Here you'll see your most recent visited pet profiles!</p>
          </div>
        ) : (
          visitedPets.map((pet) => (
            <Link to={`/adopt/${pet.animalID}`} state={{ pet }} key={pet.animalID}>
              <div className="fav-item">
                <h1 className='pet-name'>{pet.name}</h1>
                <img src="/rightpaw.png" alt="Pawprint" className="paw-icon" />
              </div>
            </Link>
          ))
        )}
      </div>

      <button className='clear-btn' onClick={() => handleClearVisitedHistory()}>Clear</button>
    </div>

  )
}

export default VisitedPets
