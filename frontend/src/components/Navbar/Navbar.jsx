import React from 'react'
import './Navbar.scss'

function Navbar() {
  return (
    <div className='container'>
        <div>
        <h1 className='title'>PAWfect Match</h1>
        </div>
        <div className='list'>
            <ul>
                <li>
                    <button>About</button>
                </li>
                <li>
                    <button>Contact</button>
                </li>
                <li>
                    <button>Services</button>
                </li>
            </ul>
        </div>
    </div>
  )
}

export default Navbar