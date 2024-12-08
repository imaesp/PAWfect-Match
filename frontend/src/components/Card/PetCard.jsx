import Button from 'react-bootstrap/Button';
import { Card } from 'react-bootstrap';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './PetCard.scss';

function PetCard({ pet }) {
    const [isClicked, setIsClicked] = useState({});

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

    const heartIconSrc = isClicked[pet.animalID] ? '/heartfill.png' : '/heart.png';

    const sizeAndSexLabels = {
        "Medium": 'M',
        "Small": 'S',
        "Large": 'L',
        "Female": 'F',
        "Male": 'M'
    };

    return (
        <Card>
            <Card.Img
                variant="top"
                src={picture}
                alt={pet.name + " the PAWfect Pet"}
            />
            <img
                src={heartIconSrc}
                alt="Heart Icon"
                className="icon-overlay"
                onClick={() => handleClick(pet.animalID)}
            />
            <Card.Body>
                <Card.Title>{pet.name}</Card.Title>
                <div className="info-circles">
                    {pet.size && <div className="circle"> Size <br /> {sizeAndSexLabels[pet.size]} </div>}
                    {pet.sex && <div className="circle">{sizeAndSexLabels[pet.sex]}</div>}
                </div>
                {!pet.size && !pet.sex && (
                    <Card.Text>No size or sex available</Card.Text>
                )}
                <Link to={`/adopt/${pet.animalID}`} state={{ pet }}>
                    <Button variant="primary">Adopt Me</Button>
                </Link>
            </Card.Body>
        </Card>
    );
}

export default PetCard;

