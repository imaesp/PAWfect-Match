import { useEffect, useState } from 'react';
//import { useQuery } from '@tanstack/react-query';
import './NearYou.scss';
//import { getSupabaseBrowserClient } from '../../supabase/supabaseClient';
import { findBestMatches } from '../../utils/petMatchAlgorithm';
import { useUser } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card } from 'react-bootstrap';
import useSurveyResponsesQuery from '../../hooks/useSurveyResponsesQuery';
import useGetPets from '../../hooks/useGetPets';


const NearYou = () => {
  const { user } = useUser();
  const [animatePets, setAnimatePets] = useState(false);
  
  useEffect(() => {
    const petAnimationInterval = setInterval(() => {
      setAnimatePets((prev) => !prev);
    }, 2000);

    return () => {
      clearInterval(petAnimationInterval);
    };
  }, []);

  // Fetch pets data from Supabase
  const {
    data: pets,
    isLoading: petsLoading,
    isError: petsError,
  } = useGetPets();

  // Fetch survey responses for the current user
  const {
    data: surveyData,
    isLoading: surveyLoading,
    isError: surveyError,
  } = useSurveyResponsesQuery(user?.id);

  if(petsLoading || surveyLoading) return <p>Loading...</p>
  if(petsError || surveyError) return <p>Error loading Data</p>

  // Format survey data
  const formatSurveyData = (surveyData) => ({
    species: surveyData.species,
    sex: surveyData.sex,
    activityLevel: surveyData.activityLevel,
    energyLevel: surveyData.energyLevel,
    age: surveyData.age,
    livingArea: surveyData.livingArea,
    outdoorAccess: surveyData.outdoorAccess,
    size: surveyData.size,
    breed: surveyData.breed || [],
  });

  // Parse pictures 
  const parsePictures = (pictures) => {
    try {
      return JSON.parse(pictures.replace(/'/g, '"')) || [];
    } catch {
      return [];
    }
  };

   const userAnswers = surveyData?.answers ? formatSurveyData(surveyData.answers) : null;
  // Get the top 3 best matches or all pets if no userAnswers
  const petsToDisplay = userAnswers ? findBestMatches(userAnswers, pets, 3) : pets;

  // Limit petsToDisplay to only the first 3 pets
  const limitedPets = petsToDisplay.slice(0, 3);

  const sizeAndSexLabels = {
    "Medium": 'M',
    "Small": 'S',
    "Large": 'L',
    "Female": 'F',
    "Male": 'M'
  };
  
  return (
    <div className="pet-container">
      <h1>Check out your top matches!</h1>
      <div className="pet-cards">
        {limitedPets.map((pet, index) => {
          const picturesArray = parsePictures(pet.pictures);
          const picture = picturesArray[0];

          return (
            <motion.div
              key={index}
              className="pet-card"
              initial={{ y: 0 }}
              animate={{ y: animatePets ? [0, -20, 0] : 0 }} // Toggle animation when state changes
              transition={{
                duration: 0.6,
                ease: 'easeInOut',
                delay: 0.5 * index,
              }}
            >
              <Card className='card'>
                  <Card.Img
                      variant="top"
                      src={picture}
                      alt={`${pet.name} the PAWfect Pet`}
                  />
                  <Card.Body>
                      <Card.Title>{pet.name}</Card.Title>
                      <div className="info-circles">
                          {pet.size && <div className="circle"> Size <br /> {sizeAndSexLabels[pet.size]} </div>}
                          {pet.sex && <div className="circle"> Sex <br /> {sizeAndSexLabels[pet.sex]}</div>}
                      </div>
                      {!pet.size && !pet.sex && (
                          <Card.Text></Card.Text>
                      )}
                  </Card.Body>
              </Card>
            </motion.div>
          );
        })}
      </div>
      <Link
        to='/adopt'
        style={{
          textDecoration: 'none',
          color: '#fff',
          transition: 'color 0.3s ease',
        }}
        onMouseEnter={(e) => (e.target.style.color = '#de9d76')}
        onMouseLeave={(e) => (e.target.style.color = '#220601')}
      >
        <p>Meet the 3,000+ adoptable pets waiting for a home!</p>
        <img className="paw-print" src='/leftpaw.png' alt="" style={{ height: '45px', marginLeft:'10px'}} />
      </Link>
    </div>
  );
};

export default NearYou;
