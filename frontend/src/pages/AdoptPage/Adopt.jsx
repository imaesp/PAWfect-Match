import { useState, useEffect } from 'react';
import PetCard from '../../components/Card/PetCard';
import CarouselAdopt from '../../components/CarouselAdopt/CarouselAdopt';
import Filter from '../../components/Filter/Filter'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './Adopt.scss';
import supabase from '../../supabase/supabaseClient';
import { useUser } from '@clerk/clerk-react'; // For user authentication
import { findBestMatches } from '../../utils/petMatchAlgorithm';

function Adopt() {
    const { user } = useUser();
    const [pets, setPets] = useState([]);
    const [userAnswers, setUserAnswers] = useState(null); // Survey data
    const [loading, setLoading] = useState(true);
    // Fetch pets data from Supabase
    useEffect(() => {
        async function getPets() {
            try {
                const { data, error } = await supabase
                    .from('pets')
                    .select('animalID, name, species, sex, activityLevel, energyLevel, age, size, breed, primaryBreed, pictures')
                if (error) throw error;
                setPets(data);
            } catch (error) {
                console.error("Error fetching pets:", error.message);
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
        species: surveyData.species, 
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
    return (
        <>
            <CarouselAdopt/>
            <Filter> </Filter>
                <Row xs={1} sm={2} md={3} lg={4} className="g-4">
                    {bestMatches.map((pet) => (
                        <Col key={pet.animalID}>
                            <PetCard pet={pet} />
                        </Col>
                    ))}
                </Row>
        
        </>
    );
}

export default Adopt;
