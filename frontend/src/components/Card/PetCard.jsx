import Button from 'react-bootstrap/Button';
import { Card } from 'react-bootstrap';
import { useState } from 'react';
import './PetCard.scss';

function PetCard(){
   // State to track whether the icon has been clicked
   const [isClicked, setIsClicked] = useState(false);

   // Handle the click event and toggle the state
   const handleClick = () => setIsClicked(!isClicked);

   // Conditionally set the image source based on the `isClicked` state
   const heartIconSrc = isClicked ? '/heartfill.png' : '/heart.png';

    
    return (
        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src="/pet_2.jpeg" />
             {/* Use the dynamic image source for the heart icon */}
             <img 
                src={heartIconSrc} 
                alt="Heart Icon" 
                className="icon-overlay" 
                onClick={handleClick} 
            />
          <Card.Body>
            <Card.Title>Max</Card.Title>
            <Card.Text>
                Breed | Age
            </Card.Text>
            <Button variant="primary">Adopt Me</Button>
          </Card.Body>
        </Card>
      );
}





export default PetCard;