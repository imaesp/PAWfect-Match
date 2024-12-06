import './Footer.scss';


function Footer() {
  return (
    <div className='container-footer'>

      <div className='text'>
          <ul>
            <li>Contact</li>
          </ul>
          <p>PAWfect Match</p>
      </div>

      <div className='paw-logo'>
        <img src= '/leftpaw.png' alt = "Paw Logo" style={{ marginBottom: '20px'}}/>
      </div>


    <div className='text'>
      <p>&copy; 2024 All Rights Reserved</p>
      <p>Shooby Dooby Doo</p>
    </div>
    </div>
    
  )
}

export default Footer