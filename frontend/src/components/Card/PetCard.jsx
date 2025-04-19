import Button from 'react-bootstrap/Button';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './PetCard.scss';

function PetCard({ pet, handleClick, isFavorited }) {
    
    let picturesArray = [];
    try {
        picturesArray = JSON.parse(pet.pictures.replace(/'/g, '"'));
    } catch (error) {
        console.error('Failed to parse pictures string:', error);
    }
    const picture = picturesArray[0]; // Only the first picture

    const sizeAndSexLabels = {
        "Medium": 'M',
        "Small": 'S',
        "Large": 'L',
        "Female": 'F',
        "Male": 'M'
    };

    return (
        <Card className='pet-card'>
            <Card.Img
                variant="top"
                src={picture || '/default.jpg'}
                alt={pet.name + " the PAWfect Pet"}
            />
            <img
                 src={isFavorited ? '/heartfill.png' : '/heart.png'}
                 alt="Heart Icon"
                 className="icon-overlay"
                 onClick={() => handleClick(pet)}
            />
            <Card.Body>
                <Card.Title className='card-title'>{pet.name}</Card.Title>
                <div className="info-circles">
                    {pet.size && <div className="circle"> Size <br /> {sizeAndSexLabels[pet.size]} </div>}
                    {pet.sex && <div className="circle"> Sex <br /> {sizeAndSexLabels[pet.sex]}</div>}
                </div>
                {!pet.size && !pet.sex && (
                    <Card.Text></Card.Text>
                )}
                <Link to={`/adopt/${pet.animalID}`} state={{ pet }}>
                    <Button className='adopt-button' variant="primary">Adopt Me</Button>
                </Link>
            </Card.Body>
        </Card>
    );
}

export default PetCard;