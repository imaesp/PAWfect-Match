import { useState, useEffect } from 'react';
import PetCard from '../../components/Card/PetCard';
import CarouselAdopt from '../../components/CarouselAdopt/CarouselAdopt';
import Filter from '../../components/Filter/Filter'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './Adopt.scss';
import supabase from '../../supabase/supabaseClient';

function Adopt() {
    const [pets, setPets] = useState([]);

    // Fetch pets data from Supabase
    useEffect(() => {
        async function getPets() {
            try {
                const { data, error } = await supabase
                    .from('pets')
                    .select('animalID, name, breed, age, pictures')
                    .in('species', ['Dog', 'Cat']) 
                    .limit(32);  
                if (error) throw error;
                setPets(data);
            } catch (error) {
                console.error("Error fetching pets:", error.message);
            }
        }

        getPets();
    }, []);

    return (
        <>
            <CarouselAdopt/>
            <Filter> </Filter>
                <Row xs={1} sm={2} md={3} lg={4} className="g-4">
                    {pets.map((pet) => (
                        <Col key={pet.animalID}>
                            <PetCard pet={pet} />
                        </Col>
                    ))}
                </Row>
        
        </>
    );
}

export default Adopt;
