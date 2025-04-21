import { useState, useEffect } from 'react';
import PetCard from '../../components/Card/PetCard';
import CertifiedPetCard from '../../components/Card/CertifiedPetCard';
import CarouselAdopt from '../../components/CarouselAdopt/CarouselAdopt';
import Filter from '../../components/Filter/Filter';
import './Adopt.scss';
import { useUser } from '@clerk/clerk-react';
import { findBestMatches } from '../../utils/petMatchAlgorithm';
import useSurveyResponsesQuery from '../../hooks/useSurveyResponsesQuery';
import useGetPets from '../../hooks/useGetPets';
import PawPrintLeftToRight from '../../components/PawPrintAnimation/PawPrintLtoR';
import Favorites from '../../components/Favorites/Favorites';
import VisitedPets from '../../components/VisitedPets/VisitedPets';

function Adopt() {
    const { user } = useUser();
    const user_id = user?.id;
    const [page, setPage] = useState(1);
    const [favoritedPets, setFavoritedPets] = useState([]);
    const [visitedPets, setVisitedPets] = useState([]);
    const [selectedFilters, setSelectedFilters] = useState({
        species: '',
        sex: '',
        size: '',
        age: '',
        breed: '',
        state: '',
    });

    const handleClick = (pet) => {
        const existing = JSON.parse(localStorage.getItem("favoritedPets")) || [];
        const updated = existing.some(f => f && f.animalID === pet.animalID)
            ? existing.filter(f => f.animalID !== pet.animalID)
            : [...existing, pet];
    
        localStorage.setItem("favoritedPets", JSON.stringify(updated));
        setFavoritedPets(updated);
    };

    const handleVisited = (pet) => {
        const existing = JSON.parse(localStorage.getItem("visitedPets")) || [];
        const alreadyVisited = existing.some(f => f && f.animalID === pet.animalID);
      
        if (!alreadyVisited) {
          const updated = [...existing, pet];
          localStorage.setItem("visitedPets", JSON.stringify(updated));
          setVisitedPets(updated);
        }
    };

    const handleClearVisitedHistory = () => {
        const existing = JSON.parse(localStorage.getItem("visitedPets")) || [];
        if (existing) {
            localStorage.removeItem("visitedPets");
        }
    };

    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem("favoritedPets")) || [];
        setFavoritedPets(storedFavorites);
    }, []);

    useEffect(() => {
        const storedVisited = JSON.parse(localStorage.getItem("visitedPets")) || [];
        setVisitedPets(storedVisited);
    }, [handleClearVisitedHistory]);

   
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

    
    const matchedPets = userAnswers && user?.id
    ? findBestMatches(userAnswers, pets, pets.length)
    : pets;

    const certifiedMatches = matchedPets.slice(0,3);
    for (let i = 0; i < 3; i++) {
        certifiedMatches[i] = matchedPets[i].animalID;
    }

    // Apply filters to the full matchedPets list
    const filteredPets = matchedPets.filter((pet) => {
        return (
            (!selectedFilters.species || pet.species === selectedFilters.species) &&
            (!selectedFilters.sex || pet.sex === selectedFilters.sex) &&
            (!selectedFilters.size || pet.size === selectedFilters.size) &&
            (!selectedFilters.age || pet.age === selectedFilters.age) &&
            (!selectedFilters.breed || pet.breed === selectedFilters.breed) &&
            (!selectedFilters.state || pet.state === selectedFilters.state)
        );
    });

    // Then paginate the filtered list
    const itemsPerPage = 15;
    const startIndex = (page - 1) * itemsPerPage;
    const paginatedPets = filteredPets.slice(startIndex, startIndex + itemsPerPage);

    const handleFilterChange = (filterType, value) => {
        setSelectedFilters((prevState) => ({
            ...prevState,
            [filterType]: value,
        }));
    };

    const handlePageChange = (direction) => {
        setPage((prevPage) => {
            const totalPages = Math.ceil(filteredPets.length / itemsPerPage);
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
                {/* Image Carrousel */}
                <CarouselAdopt className='adopt-carrousel' />
                <div className="content-container">
                    <div className='container-left'>
                        {/* Filter selection Container */}
                        <div className="filter-container">
                            <Filter className="adopt-filter" onFilterChange={handleFilterChange} />
                        </div>
                        {/* Favorites Container */}
                        <div className='favorites-container'>
                            <Favorites favoritedPets={favoritedPets} />
                        </div>
                        {/* Visited Container */}
                        <div className='visited-container'>
                            <VisitedPets handleClearVisitedHistory={handleClearVisitedHistory} visitedPets={visitedPets}/>
                        </div>
                    </div>
                    {/* Pet Profiles Grid */}
                    <div className="pet-grid">
                        {paginatedPets.map((pet) =>
                            certifiedMatches.includes(pet.animalID) ? (
                            <CertifiedPetCard key={pet.animalID} pet={pet} handleVisited={handleVisited} handleClick={handleClick} isFavorited={!!favoritedPets.find(p => p.animalID === pet.animalID)}/>
                            ) : (
                            <PetCard key={pet.animalID} pet={pet} handleVisited={handleVisited} handleClick={handleClick} isFavorited={!!favoritedPets.find(p => p.animalID === pet.animalID)} />
                            )
                        )}
                    </div>
                    {/* Pagination Controls */}
                    <div className="pagination-controls">
                        <button className='pagination-button' onClick={() => handlePageChange('prev')} disabled={page === 1}>
                            Previous
                        </button>
                        <span>Page {page}</span>
                        <button className='pagination-button' onClick={() => handlePageChange('next')} disabled={page * itemsPerPage >= (userAnswers && user?.id ? findBestMatches(userAnswers, pets, 3547) : pets).length}>
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Adopt;
