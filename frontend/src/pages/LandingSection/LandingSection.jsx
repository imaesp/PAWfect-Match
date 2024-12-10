import { useState, useEffect } from 'react';
import "./LandingSection.scss"; // Import the SCSS file
import Card from "../../components/Card/Card";
import SignedCard from "../../components/Card/SignedIn.jsx";
import { useUser } from '@clerk/clerk-react';
import supabase from '../../supabase/supabaseClient';

const LandingSection = () => {
  const { user } = useUser();
  const [userAnswers, setUserAnswers] = useState(null); // Survey data
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    async function fetchSurveyData() {
      if (!user?.id) {
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('survey_responses')
          .select('answers')
          .eq('user_id', user.id)
          .maybeSingle();

        if (error) throw error;

        if (data?.answers) {
          setUserAnswers(data.answers);
        } else {
          setUserAnswers(null);
        }
      } catch (error) {
        console.error('Failed to fetch survey data:', error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchSurveyData();
  }, [user?.id]);

  if (loading) {
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
      {(!userAnswers || !user?.id) ? (
        <Card/>
      ) : (
        <SignedCard/>
      )}
    </div>
  );
};

export default LandingSection;
