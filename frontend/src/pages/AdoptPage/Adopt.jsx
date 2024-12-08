import { useState, useEffect } from 'react';
import PetCard from '../../components/Card/PetCard';
import Card from "../../components/Card/Card";
import SignedCard from "../../components/Card/SignedIn";
import CarouselAdopt from '../../components/CarouselAdopt/CarouselAdopt';
import Filter from '../../components/Filter/Filter';
import './Adopt.scss';
import supabase from '../../supabase/supabaseClient';
import { useUser } from '@clerk/clerk-react';
import { findBestMatches } from '../../utils/petMatchAlgorithm';

function Adopt() {
    const { user } = useUser();
    const [pets, setPets] = useState([]);
    const [userAnswers, setUserAnswers] = useState(null);
    const [loading, setLoading] = useState(true);
    const [organizations, setOrganizations] = useState([]);
    const [selectedFilters, setSelectedFilters] = useState({
        species: '',
        sex: '',
        size: '',
        age: '',
        breed: '',
        state: '',
    });

    useEffect(() => {
        async function getPets() {
            try {
                const { data, error } = await supabase
                    .from('pets')
                    .select(`animalID, name, species, sex, activityLevel, energyLevel, age, size, breed, primaryBreed, secondaryBreed, animalLocation, pictures, birthdate, descriptionPlain, orgID`);
                if (error) throw error;
                setPets(data);
            } catch (error) {
                console.error("Error fetching pets:", error.message);
            }
        }

        getPets();
    }, []);

    useEffect(() => {
        async function getOrganizations() {
            try {
                const { data, error } = await supabase
                    .from('organizations')
                    .select(`orgID, name, city, state, address, country, zip, email, phone, orgurl`);
                if (error) throw error;
                setOrganizations(data);
            } catch (error) {
                console.error("Error fetching organizations:", error.message);
            }
        }

        getOrganizations();
    }, []);

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

    const petsWithState = pets.length && organizations.length ? pets.map((pet) => {
        const org = organizations.find((org) => org.orgID === pet.orgID);
        return {
            ...pet,
            state: org ? org.state : '', // Add state from organization
        };
    }) : [];

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

    if (!userAnswers || !user?.id) {
        return (
            <div className='adopt-page'>
                <div className='adopt-container'>
                    <CarouselAdopt className='adopt-carrousel'/>

                    {/* Two-column layout using Bootstrap grid */}
                    <div className="container text-center">
                        <div className="row align-items-start">
                            <div className="col-md-4">
                                <Filter className="adopt-filter" onFilterChange={handleFilterChange} />
                                <Card></Card>
                            </div>
                            <div className="col-md-8">
                                <div className="pet-grid">
                                    {filteredPets.map((pet) => (
                                        <PetCard key={pet.animalID} pet={pet} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
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

    const bestMatches = findBestMatches(userAnswers, filteredPets, 3547);

    return (
        <div className='adopt-page'>
            <div className='adopt-container'>
                <CarouselAdopt className='adopt-carrousel'/>
                
                {/* Two-column layout using Bootstrap grid */}
                <div className="container text-center">
                    <div className="row align-items-start">
                        <div className="col-md-4">
                            <Filter className="adopt-filter" onFilterChange={handleFilterChange} />
                            <SignedCard></SignedCard>
                        </div>
                        <div className="col-md-8">
                            <div className="pet-grid">
                                {bestMatches.map((pet) => (
                                    <PetCard key={pet.animalID} pet={pet} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Adopt;
