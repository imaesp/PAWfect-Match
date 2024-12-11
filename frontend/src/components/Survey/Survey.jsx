
import React, { useState, useEffect } from "react";
import * as Survey from "survey-react";
import supabase from "../../supabase/supabaseClient";
import { useUser } from "@clerk/clerk-react"; 
import { json } from "./json";
import "survey-react/survey.css";
import { theme } from "./survey_theme";
import './Survey.scss';
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';

const SurveyComp = () => {
  const { user } = useUser();
  const userId = user?.id; 
  const [hasCompletedSurvey, setHasCompletedSurvey] = useState(false);
  const [surveyData, setSurveyData] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);
  const [animationTriggered, setAnimationTriggered] = useState(false);

  const checkSurveyStatus = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("survey_responses")
        .select("answers")
        .eq("user_id", userId)
        .maybeSingle();
  
      if (error) {
        console.error("Error checking survey status:", error);
        setError("Failed to fetch survey status.");
        return;
      }
  
      if (data) {
        setHasCompletedSurvey(true);
        setSurveyData(data.answers);
      } else {
        setHasCompletedSurvey(false);
      }
    } catch (err) {
      console.error("Unexpected error while checking survey status:", err);
      setError("Failed to check survey status.");
    } finally {
      setLoading(false);
    }
  };

  const handleSurveyComplete = async (sender) => {
    const surveyData = sender.data; 
    
    try {
      const { data, error } = await supabase
        .from("survey_responses")
        .select("id")
        .eq("user_id", userId)
        .maybeSingle(); 

      if (error) {
        console.error("Error checking survey status:", error);
        return;
      }

      if (data) {
        const { error: updateError } = await supabase
          .from("survey_responses")
          .update({ answers: surveyData })
          .eq("id", data.id);

        if (updateError) {
          console.error("Error updating survey data:", updateError);
        } else {
          console.log("Survey data updated successfully.");
        }
      } else {
        const { error: insertError } = await supabase
          .from("survey_responses")
          .insert([{ user_id: userId, answers: surveyData }]);

        if (insertError) {
          console.error("Error saving survey data:", insertError);
        } else {
          console.log("Survey data saved successfully.");
        }
      }
      await checkSurveyStatus();
    } catch (err) {
      console.error("Unexpected error during survey handling:", err);
    }
  };

  const survey = new Survey.Model(json); 
  survey.applyTheme(theme);
  survey.onComplete.add(handleSurveyComplete);

  useEffect(() => {
    if (userId) {
      checkSurveyStatus();
    } else {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    if (hasCompletedSurvey) {
      setAnimationTriggered(true); 
    }
  }, [hasCompletedSurvey]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <p className="text-secondary fs-4">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <p className="text-danger fs-5">{error}</p>
      </div>
    );
  }


  const questionLabels = {
    "age": "Preferred Age",
    "sex": "Preferred Sex",
    "size": "Preferred Size",
    "budget":"My Budget (Approximate)",
    "species": "Preferred Species",
    "OutHours": "My Out Hours",
    "PlayHours": "Play Hours",
    "livingArea": "My Living Area",
    "activityLevel": "Preferred Activity Level",
    "outdoorAccess": "My Outdoor Access",
  };

  if (hasCompletedSurvey) {
    return (
      <div className={`survey-results-container ${animationTriggered ? 'fade-in' : ''}`}>
        <h1 className="title text-center mb-5">Your Survey Responses</h1>
        <ul className="list-group">
          {Object.entries(surveyData).map(([question, answer]) => (
            <li
              key={question}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <strong>{questionLabels[question] || question}:</strong>
              <span>{answer}</span>
            </li>
          ))}
        </ul>
        <button
          className="btn btn-primary mt-4 big-boy"
          onClick={() => setHasCompletedSurvey(false)}
          style={{height: '65px', gap: '20px'}}
        >
          Edit Survey
        </button>
        <Link to='/'>
          <button className="btn btn-primary mt-4 big-boy" >
              See Matches
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="survey-container">
      <Survey.Survey className="survey-model" model={survey} />
    </div>
  );
};

export default SurveyComp;
