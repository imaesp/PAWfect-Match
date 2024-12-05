import Button from 'react-bootstrap/Button';
import { Card } from 'react-bootstrap';
import { useState } from 'react';
import './PetCard.scss';

function PetCard({ pet }) {
    // State to track whether the icon has been clicked
    const [isClicked, setIsClicked] = useState({});

    // Toggle the heart for the specific pet by ID
    const handleClick = (petId) => {
        setIsClicked((prevState) => ({
            ...prevState,
            [petId]: !prevState[petId], 
        }));
    };

    let picturesArray = [];
    try {
        picturesArray = JSON.parse(pet.pictures.replace(/'/g, '"'));
    } catch (error) {
        console.error('Failed to parse pictures string:', error);
    }
    const picture = picturesArray[0]; // Only the first picture

    // Conditionally set the image source based on the `isClicked` state
    const heartIconSrc = isClicked[pet.animalID] ? '/heartfill.png' : '/heart.png';

    return (
        
            <Card>
                <Card.Img 
                    variant="top" 
                    src={picture}  
                    alt={pet.name + " the PAWfect Pet"} 
                />
                {/* Heart icon, toggles state on click */}
                <img
                    src={heartIconSrc}
                    alt="Heart Icon"
                    className="icon-overlay"
                    onClick={() => handleClick(pet.animalID)} 
                />

                <Card.Body>
                    <Card.Title>{pet.name}</Card.Title>
                    <Card.Text>
                        {pet.breed} | {pet.age}
                    </Card.Text>
                    <Button variant="primary">Adopt Me</Button>
                </Card.Body>
            </Card>

    );
}

export default PetCard;
