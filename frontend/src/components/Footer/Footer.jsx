import './Footer.scss'

function Footer() {
  return (
    <div className='container text-center'>
      <div className='text'>
          <ul>
            <li>Home</li>
            <li>Contact</li>
            <li>Services</li>
          </ul>
          <p>PAWfect Match</p>
      </div>
      <div className='paw-logo'>
        <img src= 'src/components/Footer/paw.png' alt = "Paw Logo"/>
      </div>
      <div className='text'>
        <p>&copy; 2024 All Rights Reserved</p>
        <p>Shooby Dooby Doo</p>
      </div>
    </div>
    
  )
}

export default Footer