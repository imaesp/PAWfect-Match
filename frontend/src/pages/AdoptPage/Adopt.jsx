import { useState, useEffect } from 'react';
import PetCard from '../../components/Card/PetCard';
import CarouselAdopt from '../../components/CarouselAdopt/CarouselAdopt';
import Filter from '../../components/Filter/Filter';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './Adopt.scss';
import supabase from '../../supabase/supabaseClient';
import { useUser } from '@clerk/clerk-react';
import { findBestMatches } from '../../utils/petMatchAlgorithm';

function Adopt() {
    const { user } = useUser();
    const [pets, setPets] = useState([]);
    const [userAnswers, setUserAnswers] = useState(null); // Survey data
    const [loading, setLoading] = useState(true);
    const [organization, setOrganization] = useState([]);
    const [selectedFilters, setSelectedFilters] = useState({
        species: '',
        sex: '',
        size: '',
        age: '',
        breed: '',
        state: '',
    });

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
                        state
                    `);
                if (error) throw error;
                setOrganization(data);
            } catch (error) {
                console.error("Error fetching organizations:", error.message);
            }
        }

        getOrganization();
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
                console.error('Failed to fetch survey data:', error.message);
            } finally {
                setLoading(false);
            }
        }

        fetchSurveyData();
    }, [user?.id]);

    // Format survey data to match the userAnswers structure
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

    const handleFilterChange = (filterType, value) => {
        setSelectedFilters((prevState) => ({
            ...prevState,
            [filterType]: value,
        }));
    };

    // Add state from organizations to pets based on orgID
    const petsWithState = pets.map((pet) => {
        const org = organization.find((org) => org.orgID === pet.orgID);
        return {
            ...pet,
            state: org ? org.state : '', // Add state from organization
        };
    });

    // Function to filter pets based on selected filters
    const filteredPets = petsWithState.filter((pet) => {
        return (
            (selectedFilters.species ? pet.species === selectedFilters.species : true) &&
            (selectedFilters.sex ? pet.sex === selectedFilters.sex : true) &&
            (selectedFilters.size ? pet.size === selectedFilters.size : true) &&
            (selectedFilters.age ? pet.age === selectedFilters.age : true) &&
            (selectedFilters.breed ? pet.breed === selectedFilters.breed : true) &&
            (selectedFilters.state ? pet.state === selectedFilters.state : true)
        );
    });

    // If the user is not authenticated or doesn't have survey data, show all pets
    if (!userAnswers || !user?.id) {
        return (
            <div className='adopt-page'>
                <div className='adopt-container'>
                    <CarouselAdopt />
                    <Filter onFilterChange={handleFilterChange} />
                    <Row xs={1} sm={2} md={3} lg={5} className="g-4">
                        {filteredPets.map((pet) => (
                            <Col key={pet.animalID}>
                                <PetCard pet={pet} />
                            </Col>
                        ))}
                    </Row>
                </div>
            </div>
        );
    }
    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <p className="text-secondary fs-4">Loading...</p>
            </div>
        );
    }

    // If user is authenticated and has survey data, show best matches
    const bestMatches = findBestMatches(userAnswers, filteredPets, 3547);

    return (
        <div className='adopt-page'>
            <div className='adopt-container'>
                <CarouselAdopt />
                <Filter onFilterChange={handleFilterChange} />
                <Row xs={1} sm={2} md={3} lg={5} className="g-4">
                    {bestMatches.map((pet) => (
                        <Col key={pet.animalID}>
                            <PetCard pet={pet} />
                        </Col>
                    ))}
                </Row>
            </div>
        </div>
    );
}

export default Adopt;
