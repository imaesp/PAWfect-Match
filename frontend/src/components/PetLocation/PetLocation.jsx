import React from 'react'
import { useState, useEffect } from 'react';
import supabase from '../../supabase/supabaseClient';
import './PetLocation.scss'


function PetLocation() {
    
    const [pets, setPets] = useState([]);
    const [organizations, setOrganization] = useState([]);
    const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_KEY;
    const mapSrc = `https://www.google.com/maps/embed/v1/place?key=${API_KEY}&q=nyc`;
  // Fetch pets data from Supabase
    useEffect(() => {
        async function getPets() {
            try {
                const { data, error } = await supabase
                    .from('pets')
                    .select(`
                        animalID, 
                        name, 
                        species, 
                        sex, 
                        activityLevel, 
                        energyLevel, 
                        age, 
                        size, 
                        breed, 
                        primaryBreed, 
                        secondaryBreed, 
                        animalLocation, 
                        pictures,
                        orgID
                    `);
                if (error) throw error;
                setPets(data);
            } catch (error) {
                console.error("Error fetching pets:", error.message);
            }
        }

        getPets();
    }, []);

    // Fetch organization data
    useEffect(() => {
        async function getOrganization() {
            try {
                const { data, error } = await supabase
                    .from('organizations')
                    .select(`
                        orgID,
                        name,
                        city,
                        state,
                        address,
                        country,
                        zip,
                        email
                    `)
                    .limit(5);
                if (error) throw error;
                setOrganization(data);
            } catch (error) {
                console.error("Error fetching organizations:", error.message);
            }
        }

        getOrganization();
    }, []);

  return (
    <div className="location-card card">
        {organizations.map((organization) => (
            <div className="card-body" key={organization.orgID}>
                <h5 className="card-title">{organization.name}</h5>
                <h6 className='card-subtitle mb-2 text-body-secondary'>{organization.city} , {organization.state}</h6>
                <iframe
                    width="450"
                    height="250"
                    frameBorder="0"
                    referrerPolicy="no-referrer-when-downgrade"
                    src={`https://www.google.com/maps/embed/v1/place?key=${API_KEY}&q=${organization.zip}`}
                    allowFullScreen>
                </iframe>
                <p>{organization.email}</p>
                <a href="#" className="btn btn-primary">More About {organization.name}</a>
                
            </div>
        ))}
    </div>
  )
}

export default PetLocation