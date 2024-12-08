import './Checklist.scss'
import Checkbox from '../../components/Checkbox/Checkbox';
import { ChecklistItems } from './ChecklistItems';
import Card from 'react-bootstrap/Card';
import CardHeader from 'react-bootstrap/esm/CardHeader';
import CardBody from 'react-bootstrap/esm/CardBody';
import PawPrintLeftToRight from '../../components/PawPrintAnimation/PawPrintLtoR';

function Checklist(){
    
    return(
        <>
            <section className='checklist-header'>
                <h1 className='top'>Pet Adoption <p className='ampersand'>&</p></h1>
                <h1 className='bottom'>Care Checklist</h1>
                <p className='page-description'>Whether you're adopting a new pet or taking care of the one you already have,
                    our checklist will help ensure you're fully prepared
                </p>      
                <a href='#Adopting' className='adopt'>Adopting a Pet</a> | <a href = '#OngoingCare' className='care'>Ongoing Pet Care</a>
            </section>


            <div className='checklist-layout'>

                <section id='Adopting'>
                    <h3>Adopting a Pet Checklist</h3>
                    <p className='no-wrap-paragraph'>Getting ready to adopt a new furry companion is an exciting time! 
                        Here’s a checklist to ensure you’re ready to welcome a new pet into your life:
                    </p>
                    {ChecklistItems.filter(item => item.section === 'Adopting').map((item) => (
                        <div key={item.id} className={`category-${item.category.replace(/\s+/g, '-').toLowerCase()}`} style={{color: '#390510'}}>
                            <Card className='checklist-card'>
                                <CardHeader><h4>{item.category}</h4></CardHeader>
                                <CardBody>
                                    {item.value.map((v, index) => (
                                        <div key={`${item.id}-${index}`} className="checkbox-container">
                                            <Checkbox
                                                id={`${item.id}-${index}`}
                                                section={item.section}
                                                value={v} 
                                            />
                                        </div>
                                    ))}
                                </CardBody>
                            </Card>
                        </div>
                    ))}
                </section>
                
                <PawPrintLeftToRight></PawPrintLeftToRight>
                <section id='OngoingCare'>
                    <h3>Ongoing Pet Care Checklist</h3>
                    <br/>
                    <p className='no-wrap-paragraph'> Once you’ve adopted your pet, it’s important to provide continuous care. 
                        Here’s your checklist to keep your pet happy, healthy, and thriving.
                    </p>
                    <br/>
                    {ChecklistItems.filter(item => item.section === 'Ongoing Pet Care Checklist').map((item) => (
                        <div key={item.id} style={{color: '#390510'}}>


                            <Card className='checklist-card'>
                            <CardHeader><h4>{item.category}</h4></CardHeader>
                            <CardBody>
                            {item.value.map((v, index) => (
                                <>
                                <div key={`${item.id}-${index}`} className="checkbox-container">
                                    <Checkbox 
                                        id = {`${item.id}-${index}`}
                                        section = {item.section}
                                        value = {v}
                                    />
                                    </div>
                                </>
                            ))}
                            </CardBody>
                            </Card>
                        </div>
                    ))}
                </section>
            </div>

        </>
    );
}
export  default Checklist;