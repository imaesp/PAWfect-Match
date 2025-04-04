import { useState, useEffect } from 'react';
import PetCard from '../../components/Card/PetCard';
import CarouselAdopt from '../../components/CarouselAdopt/CarouselAdopt';
import Filter from '../../components/Filter/Filter';
import './Adopt.scss';
import { useUser } from '@clerk/clerk-react';
import { findBestMatches } from '../../utils/petMatchAlgorithm';
import useSurveyResponsesQuery from '../../hooks/useSurveyResponsesQuery';
import useGetPets from '../../hooks/useGetPets';
import PawPrintLeftToRight from '../../components/PawPrintAnimation/PawPrintLtoR';

function Adopt() {
    const { user } = useUser();
    const user_id = user?.id;
    const [page, setPage] = useState(1);
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
 
    
    const itemsPerPage = 12;
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const petsToDisplay = userAnswers && user?.id ? findBestMatches(userAnswers, pets, 3547).slice(startIndex, endIndex) : pets.slice(startIndex, endIndex);

    const handlePageChange = (direction) => {
        setPage((prevPage) => {
            const totalPages = Math.ceil((userAnswers && user?.id ? findBestMatches(userAnswers, pets, 3547) : pets).length / itemsPerPage);
            if (direction === 'next' && prevPage < totalPages) {
                return prevPage + 1;
            } else if (direction === 'prev' && prevPage > 1) {
                return prevPage - 1;
            }
            return prevPage;
        });
    };

    return (
        <div className='adopt-page'>
            <div className='adopt-container'>
                <CarouselAdopt className='adopt-carrousel' />

                {/* Two-column layout using Bootstrap grid */}
                <div className="container text-center">
                    <div className="row align-items-start">
                        <div className="col-md-4">
                            <Filter className="adopt-filter" onFilterChange={handleFilterChange} />
                        </div>
                        <div className="col-md-8">
                            <div className="pet-grid">
                                {petsToDisplay.map((pet) => (
                                    <PetCard key={pet.animalID} pet={pet} />
                                ))}
                            </div>
                        </div>
                        <div className="pagination-controls">
                            <button className='pagination-button' onClick={() => handlePageChange('prev')} disabled={page === 1}>
                                Prev
                            </button>
                            <span>Page {page}</span>
                            <button className='pagination-button' onClick={() => handlePageChange('next')} disabled={page * itemsPerPage >= (userAnswers && user?.id ? findBestMatches(userAnswers, pets, 3547) : pets).length}>
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Adopt;
