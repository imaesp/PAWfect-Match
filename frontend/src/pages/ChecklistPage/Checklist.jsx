import './Checklist.scss'
import Checkbox from '../../components/Checkbox/Checkbox';

function Checklist(){
    
    return(
        <>
            <section className='header'>
                <h1>🐾 PAWfect Match Pet Adoption & Care Checklist 🐾</h1>
                <h5>Welcome to Pawfect Match! Whether you're adopting a new pet or taking care of the one you already have,
                    this checklist will help ensure you're fully prepared. We've divided it into two parts: 
                    <a href='#Adopting'>Adopting a Pet</a> and <a href = '#OngoingCare'>Ongoing Pet Care</a>.</h5>
            </section>

            <section id='Aodpting'>
                <h3>Adopting a Pet Checklist</h3>
                <p>Getting ready to adopt a new furry companion is an exciting time! 
                    Here’s a checklist to ensure you’re ready to welcome a new pet into your life:</p>
                <p>1. Choose the Right Pet</p>
                <Checkbox/>
            </section>

            <section id='OngoingCare'>
                <h3>Ongoing Pet Care Checklist</h3>

            </section>
        </>
    );
}
export  default Checklist;