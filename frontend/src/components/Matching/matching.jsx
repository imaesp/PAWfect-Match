import { useEffect, useState } from 'react';
import supabase from '../../supabase/supabaseClient';
import { findBestMatches } from '../../utils/petMatchAlgorithm';
import { useUser } from '@clerk/clerk-react'; // For user authentication

const PetMatch = () => {
  const { user } = useUser();
  const [pets, setPets] = useState([]);
  const [userAnswers, setUserAnswers] = useState(null); // Survey data
  const [loading, setLoading] = useState(true);

  // Fetch pets from the database
  useEffect(() => {
    async function getPets() {
      try {
        const { data, error } = await supabase
          .from('pets')
          .select(
            'animalID, name, species, sex, activityLevel, energyLevel, age, size, primaryBreed, pictures'
          );
        if (error) throw error;
        if (data) {
          setPets(data);
        }
      } catch (error) {
        alert(error.message);
      }
    }

    getPets();
  }, []);

  // Fetch survey responses for the current user
  useEffect(() => {
    async function fetchSurveyData() {
      if (!user?.id) return;

      try {
        const { data, error } = await supabase
          .from('survey_responses')
          .select('answers')
          .eq('user_id', user.id)
          .maybeSingle();

        if (error) throw error;
        if (data?.answers) {
          const formattedAnswers = formatSurveyData(data.answers);
          setUserAnswers(formattedAnswers);
        } else {
          console.log('No survey data found for the user.');
          setUserAnswers(null);
        }
      } catch (error) {
        alert('Failed to fetch survey data: ' + error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchSurveyData();
  }, [user?.id]);

  // Format survey data to match the userAnswers structure
  const formatSurveyData = (surveyData) => {
    return {
      species: surveyData.species, // Default to 'Dog' if not specified
      sex: surveyData.sex,
      activityLevel: surveyData.activityLevel,
      energyLevel: surveyData.energyLevel,
      age: surveyData.age,
      livingArea: surveyData.livingArea,
      outdoorAccess: surveyData.outdoorAccess,
      size: surveyData.size,
      breed: surveyData.breed || [], // Default to empty array
    };
  };

  // Render loading spinner if data is being fetched
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <p className="text-secondary fs-4">Loading...</p>
      </div>
    );
  }

  if (!userAnswers) {
    return (
      <div className="container py-5">
        <h2 className="text-center mb-4">Complete Your Survey</h2>
        <p className="text-center">Please complete the survey to find the best-matched pets for you.</p>
      </div>
    );
  }

  const bestMatches = findBestMatches(userAnswers, pets, 100);

  const renderPets = () => {
    return bestMatches.length > 0 ? (
      bestMatches.map((pet, index) => {
        let picturesArray = [];
        try {
          picturesArray = JSON.parse(pet.pictures.replace(/'/g, '"'));
        } catch (error) {
          console.error('Failed to parse pictures string:', error);
        }
        const picture = picturesArray[0]; // Only the first picture

        return (
          <div className="col-md-4 mb-4" key={index}>
            <div className="card shadow-sm">
              <img src={picture} className="card-img-top" alt={pet.name || 'Adoptable Pet'} />
              <div className="card-body">
                <h5 className="card-title">{pet.name}</h5>
                <p className="card-text">{pet.species} - {pet.primaryBreed}</p>
                <ul className="list-unstyled">
                  <li>Age: {pet.age}</li>
                  <li>Size: {pet.size}</li>
                  <li>Energy Level: {pet.energyLevel}</li>
                  <li>Activity Level: {pet.activityLevel}</li>
                  <li>Sex: {pet.sex}</li>
                </ul>
                <a href="#" className="btn btn-primary">Adopt Me</a>
              </div>
            </div>
          </div>
        );
      })
    ) : (
      <p>No pets found</p>
    );
  };

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">Best Matched Pets</h2>
      <div className="row">
        {renderPets()}
      </div>
    </div>
  );
};

export default PetMatch;
