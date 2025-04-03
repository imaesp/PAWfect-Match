import { useLocation, Link, useNavigate } from "react-router-dom";
import PetCarousel from "../../components/PetComponents/PetCarousel";
import PetComponents from "../../components/PetComponents/PetComponents";
import PetLocation from "../../components/PetLocation/PetLocation";
import useGetOrganizationByID from "../../hooks/useGetOrganizationByID";
import './PetPage.scss'


//Create fetch organizationByOrgID Query
//Create useOrganizationByOrgID Hook
//Store current pet's orgID
//Call useOrganizationByOrgID(pet's orgID)
//Pass the organization data into the PetLocation Component


const PetPage = () => {
    const { state } = useLocation();
    const { pet } = state || {};
    const navigate = useNavigate();
    const {data: organization, isLoading: isOrganizationLoading, isError: isOrganizationError} = useGetOrganizationByID(pet?.orgID)

    if (!pet) {
        return <p>No pet found. Please go back and try again.</p>;
    }

    if (!state || !pet) {
        return (
            <div>
                <p>No pet data available. Please return to the Adopt page.</p>
                <Link to="/adopt">
                    <button className="btn btn-primary">Back to Adopt</button>
                </Link>
            </div>
        );
    }


    if (isOrganizationLoading) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <p className="text-secondary fs-4">Loading...</p>
            </div>
        );
    }

    if (isOrganizationError) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <p className="text-secondary fs-4">Error</p>
            </div>
        );
    }

    let picturesArray = [];
    try {
        picturesArray = pet.pictures
            ? JSON.parse(pet.pictures.replace(/'/g, '"'))
            : [];
    } catch (error) {
        console.error("Failed to parse pictures string:", error);
    }

    
    return (
        <div className='pet-page-container'>
            <PetCarousel
                name={pet.name}
                pictures={picturesArray.length > 0 ? picturesArray : ["/placeholder-image.png"]}
            />
            <div className='pet-page-body'>
                <PetComponents
                    className='pet-component'
                    name={pet.name}
                    birthdate={pet.birthdate}
                    sex={pet.sex}
                    age={pet.age}
                    breed={pet.breed}
                    size={pet.size}
                    housetrained={pet.housetrained}
                    declawed={pet.declawed}
                    specialNeeds={pet.specialNeeds}
                    obedienceTraining={pet.obedienceTraining}
                    descriptionPlain={pet.descriptionPlain}
                />
                <PetLocation 
                    className='pet-location'
                    name={organization.name} 
                    address={organization.address}
                    city={organization.city}
                    state={organization.state}
                    zip={organization.zip}
                    phone={organization.phone}
                    email={organization.email}
                    orgurl={organization.orgurl}>
                </PetLocation>
            </div>
            <div className='back-button-container' style={{ textAlign: "center", marginTop: "50px", paddingBottom: "50px" }}>
                <button
                    className="btn btn-secondary"
                    onClick={() => navigate("/adopt")}
                >
                   Go Back
                </button>
            </div>
        </div>
    );
};

export default PetPage;
