import React from 'react'
import './Favorites.scss'

function Favorites({ clickedIds }) {
  return (
    <div className='fav-container'>
         {clickedIds.map((id) =>
         <h1>{id}</h1>
        )}
    </div>
  )
}

export default Favorites