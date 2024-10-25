import React, { useState, useEffect } from 'react';
import './Feed.scss'

const AnimalDetails = ({ animal }) => {
  const attributes = animal.attributes;
  const primaryBreed = animal.breedString;
  const age = attributes.ageString || 'Unknown'
  const activityLevel = attributes.activityLevel || 'Unknown'


  return (
    <div className="animal-details">
      <h1>{attributes.name}</h1>
      <img className="picture" src={attributes.pictureThumbnailUrl} alt={attributes.name} />
      <p><strong>Age: </strong> {age}</p>
      <p><strong>Breed:</strong> {attributes.breedString}</p>
      <p><strong>Activity Level:</strong> {activityLevel}</p>
      <p><strong>Is Adoption Pending?:</strong> {attributes.isAdoptionPending ? "Yes" : "No"}</p>
      <p><strong>Housetrained:</strong> {attributes.isHousetrained ? "Yes" : "No"}</p>
      <p><strong>Vaccinations Current:</strong> {attributes.isCurrentVaccinations ? "Yes" : "No"}</p>
      <p><strong>Sex:</strong> {attributes.sex}</p>
      <p>{attributes.descriptionText}</p>
    </div>
  );
};

const url = "https://api.rescuegroups.org/v5";
const Feed = () => {
  const [apiResponse, setApiResponse] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${url}/public/animals/search/?sort=-animals.id&limit=10`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/vnd.api+json',
            'Authorization': '' 
          }
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setApiResponse(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      {apiResponse ? (
        <div className="animal-list">
          {apiResponse.data.map((animal, index) => (
            <AnimalDetails key={index} animal={animal} />
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Feed;
