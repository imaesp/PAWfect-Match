
import React from 'react'
import './Navbar.scss'

function Navbar() {
  return (
    <div>
        <div>
        <h1 className='title'>PAWfect Match</h1>
        </div>

        <div>
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