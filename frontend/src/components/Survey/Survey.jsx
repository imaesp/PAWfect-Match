import React, { useState, useEffect } from "react";
import * as Survey from "survey-react";
import supabase from "../../supabase/supabaseClient";
import { useUser } from "@clerk/clerk-react"; 
import { json } from "./json";
import "survey-react/survey.css";
import { theme } from "./survey_theme";
import './Survey.scss';

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
      setAnimationTriggered(true); // Trigger the fade-in animation when data is available
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

  // Render the survey if the user hasn't completed it
  if (!hasCompletedSurvey) {
    return (
      <div className="survey-container">
        <Survey.Survey className="survey-model" model={survey} />
      </div>
    );
  }

  // Render survey results with animation
  return (
    <div className={`survey-results-container ${animationTriggered ? 'fade-in' : ''}`}>
      <h1 className="title text-center mb-5">Your Survey Responses</h1>
      <ul className="list-group">
        {Object.entries(surveyData).map(([question, answer]) => (
          <li
            key={question}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <strong>{question}:</strong>
            <span>{answer}</span>
          </li>
        ))}
      </ul>
      <button
        className="btn btn-primary mt-4"
        onClick={() => setHasCompletedSurvey(false)}
      >
        Edit Survey
      </button>
    </div>
  );
};

export default SurveyComp;
