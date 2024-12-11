import React, { useEffect, useState } from 'react';
import './PetLocation.scss';

function PetLocation() {
  const organizations = [
    {
      "name": "Animal Relief Fund",
      "address": "21800 N Shangri La Drive, Unit 16",
      "city": "Lexington Park",
      "state": "MD",
      "zip": "20653",
      "country": "United States",
      "phone": "(301) 866-0303",
      "email": "info@animalrelieffund.org",
      "orgurl": "https://www.animalrelieffund.org/"
    },
    {
      "name": "Shore Animal Volunteer Enterprise",
      "address": "1594 Lakewood Road",
      "city": "Toms River",
      "state": "NJ",
      "zip": "08755",
      "country": "United States",
      "phone": "(732) 831-4291",
      "email": "SAVErescuegroups@gmail.com",
      "orgurl": ""
    },
    {
      "name": "Changing Fates Equine Rescue of DE, Inc.",
      "address": "31283 Old Cabin Road",
      "city": "Laurel",
      "state": "DE",
      "zip": "19956",
      "country": "United States",
      "phone": "(302) 339-5065",
      "email": "cferdelaware@aol.com",
      "orgurl": ""
    },
    {
      "name": "Greyhound Friends of NJ, Inc.",
      "address": "222 Long Neck Circle",
      "city": "Millsboro",
      "state": "NJ",
      "zip": "19966-0669",
      "country": "United States",
      "phone": "(732) 356-4370",
      "email": "gfnj@gfnj.info",
      "orgurl": "http://www.greyhoundfriendsnj.org"
    },

  ];

  const [randomOrganization, setRandomOrganization] = useState(null);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * organizations.length);
    setRandomOrganization(organizations[randomIndex]);
  }, []);

  if (!randomOrganization) {
    return <div>Loading...</div>;
  }

  const { name, address, city, state, zip, phone, email, orgurl } = randomOrganization;
  const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_KEY;

  return (
    <div className="location-card">
      <div className="card-body">
        <img className='title-picture' src="/pet-house.png" alt="" />
        <h5 className="card-title">{name}</h5>
        <h6 className='card-subtitle mb-2 text-body-secondary'>
          {city}, {state}
        </h6>
        <iframe
          className='map'
          width="650"
          height="400"
          frameBorder="0"
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps/embed/v1/place?key=${API_KEY}&q=${zip}`}
          allowFullScreen
        ></iframe>
        <div class="separator-line"></div>
        <div className='location-container'>
          <img className='add-svg' src="/address.svg" alt="" />
          <p className='location-text'>
            Location Address <br /> {address} <br /> {city}, {state} {zip}
          </p>
        </div>
        <div class="separator-line"></div>
        <div className='email-container'>
          <img className='email-svg' src="/email.svg" alt="" />
          <p className='email-text'>{email}</p>
        </div>
        <div class="separator-line"></div>
        <div className='phone-container'>
          <img className='phone-svg' src="/phone.svg" alt="" />
          <p className='phone-text'>{phone}</p>
        </div>
        <div className='btn-container'>
          <a href={orgurl || "#"} className="btn btn-primary">
            More About Us
          </a>
        </div>
      </div>
    </div>
  );
}

export default PetLocation;
