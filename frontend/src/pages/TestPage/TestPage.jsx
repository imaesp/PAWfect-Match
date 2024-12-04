import PetMatch from '../../components/Matching/matching'
import ZipCodeDistance from '../../components/ZipCode/ZipCode'
import PetLocation from '../../components/PetLocation/PetLocation'
import { useState, useEffect } from 'react';
import supabase from '../../supabase/supabaseClient';
import './TestPage.scss'

function TestPage() {

    const [pets, setPets] = useState([]);
    const [organizations, setOrganization] = useState([]);
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
                      email,
                      phone,
                      orgurl
                  `)
                  .limit(10);
              if (error) throw error;
              setOrganization(data);
          } catch (error) {
              console.error("Error fetching organizations:", error.message);
          }
      }

      getOrganization();
  }, []);

  console.log(organizations[0])

    return (
      <div className='test-container'>TestPage
        {organizations.length > 0 && <PetLocation organization={organizations[0]} />}
      </div>   
    )
  }

export default TestPage