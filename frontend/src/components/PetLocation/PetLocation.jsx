import React from 'react'
import './PetLocation.scss'

function PetLocation({ organization }) {
    const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_KEY;
    return (
        <div className="location-card">
            <div className="card-body" key={organization.orgID}>
                <img className='title-picture' src="pet-house.png" alt="" />
                <h5 className="card-title">{organization.name}</h5>
                <h6 className='card-subtitle mb-2 text-body-secondary'>
                    {organization.city}, {organization.state}
                </h6>
                <iframe
                    className='map'
                    width="350"
                    height="200"
                    frameBorder="0"
                    referrerPolicy="no-referrer-when-downgrade"
                    src={`https://www.google.com/maps/embed/v1/place?key=${API_KEY}&q=${organization.zip}`}
                    allowFullScreen
                ></iframe>
                <div className='location-container'>
                    <img className='add-svg' src="/address.svg" alt="" />
                    <p className='location-text'>
                        Location Address <br /> {organization.address} <br /> {organization.city}, {organization.state} {organization.zip}
                    </p>
                </div>
                <hr />
                <div className='email-container'>
                    <img className='email-svg' src="/email.svg" alt="" />
                    <p className='email-text'>{organization.email}</p>
                </div>
                <hr />
                <div className='phone-container'>
                    <img className='phone-svg' src="phone.svg" alt="" />
                    <p className='phone-text'>{organization.phone}</p>
                </div>
                <div className='btn-container'>
                    <a href="#" className="btn btn-primary">
                        More About Us
                    </a>
                </div>
            </div>
        </div>
    );
}

export default PetLocation;
