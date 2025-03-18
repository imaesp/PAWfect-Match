import "./LandingSection.scss"; // Import the SCSS file
import Card from "../../components/Card/Card";
import SignedCard from "../../components/Card/SignedIn.jsx";
import { useUser } from '@clerk/clerk-react';
import useSurveyResponsesQuery from '../../hooks/useSurveyResponsesQuery.js';

const LandingSection = () => {
  const { user } = useUser();
  const { 
    data, 
    isLoading, 
    isError 
  } = useSurveyResponsesQuery(user?.id);

  if (isError) {
    return (
      <div className="landing-container">
        <div className="text-section">
          <h1 className="heading">Error</h1>
          <p className="sub-text">{isError}</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="landing-container">
        <div className="text-section">
          <h1 className="heading">Loading...</h1>
          <p className="sub-text">Fetching your personalized data.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="landing-container">
      <div className="text-section">
        <h1 className="heading">Your PAWfect pet awaits.</h1>
        <p className="sub-text">
          We aim to create lifelong bonds between pets and their owners by
          providing a personalized matchmaking service.
        </p>
      </div>
      {(!data) ? (
        <Card/>
      ) : (
        <SignedCard/>
      )}
    </div>
  );
};

export default LandingSection;
