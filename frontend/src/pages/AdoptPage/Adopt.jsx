import { useState, useEffect } from 'react';
import PetCard from '../../components/Card/PetCard';
import CarouselAdopt from '../../components/CarouselAdopt/CarouselAdopt';
import Filter from '../../components/Filter/Filter';
import './Adopt.scss';
import { getSupabaseBrowserClient } from '../../supabase/supabaseClient';
import { useUser } from '@clerk/clerk-react';
import { findBestMatches } from '../../utils/petMatchAlgorithm';
import useSurveyResponsesQuery from '../../hooks/useSurveyResponsesQuery';
import useGetPets from '../../hooks/useGetPets';
import PawPrintLeftToRight from '../../components/PawPrintAnimation/PawPrintLtoR';

function Adopt() {
    const { user } = useUser();
    const user_id = user?.id;
    const supabase = getSupabaseBrowserClient();
    const [selectedFilters, setSelectedFilters] = useState({
        species: '',
        sex: '',
        size: '',
        age: '',
        breed: '',
        state: '',
    });
   
    const {data: surveyData, isLoading: isSurveyLoading, isSurveyError} = useSurveyResponsesQuery(user_id);
    const userAnswers = surveyData?.answers;
    
    const {data: pets, isLoading: isPetsLoading, isError: isPetsError} = useGetPets();
    
    if (isSurveyLoading || isPetsLoading) {
        return (
            <div className="loading">
                <p className="jumping-text">
                    {"Loading".split("").map((char, index) => (
                    <span key={index} style={{ animationDelay: `${index * 0.1}s` }}>
                        {char}
                    </span>
                    ))}
                </p>
                <PawPrintLeftToRight></PawPrintLeftToRight>
            </div>
        );
    }

    if(isSurveyError || isPetsError) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <p className="text-secondary fs-4">Error</p>
            </div>
        );
    }


    // const formatSurveyData = (surveyData) => ({
    //     species: surveyData.species,
    //     sex: surveyData.sex,
    //     activityLevel: surveyData.activityLevel,
    //     energyLevel: surveyData.energyLevel,
    //     age: surveyData.age,
    //     livingArea: surveyData.livingArea,
    //     outdoorAccess: surveyData.outdoorAccess,
    //     size: surveyData.size,
    //     breed: surveyData.breed || [],
    // });

    const handleFilterChange = (filterType, value) => {
        setSelectedFilters((prevState) => ({
            ...prevState,
            [filterType]: value,
        }));
    };

    // const petsWithState = pets.length && organizations.length ? pets.map((pet) => {
    //     const org = organizations.find((org) => org.orgID === pet.orgID);
    //     return {
    //         ...pet,
    //         state: org ? org.state : '', // Add state from organization
    //     };
    // }) : [];

    

    // const filteredPets = petsWithState.filter((pet) => {
    //     return (
    //         (selectedFilters.species ? pet.species === selectedFilters.species : true) &&
    //         (selectedFilters.sex ? pet.sex === selectedFilters.sex : true) &&
    //         (selectedFilters.size ? pet.size === selectedFilters.size : true) &&
    //         (selectedFilters.age ? pet.age === selectedFilters.age : true) &&
    //         (selectedFilters.breed ? pet.breed === selectedFilters.breed : true) &&
    //         (selectedFilters.state ? pet.state === selectedFilters.state : true)
    //     );
    // });


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
                            </div>
                            <div className="col-md-8">
                                <div className="pet-grid">
                                    {pets.map((pet) => (
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

    const bestMatches = findBestMatches(userAnswers, pets, 3547);

    return (
        <div className='adopt-page'>
            <div className='adopt-container'>
                <CarouselAdopt className='adopt-carrousel'/>
                
                {/* Two-column layout using Bootstrap grid */}
                <div className="container text-center">
                    <div className="row align-items-start">
                        <div className="col-md-4">
                            <Filter className="adopt-filter" onFilterChange={handleFilterChange} />
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
