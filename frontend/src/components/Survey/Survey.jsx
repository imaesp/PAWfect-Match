import React, { useState, useEffect } from "react";
import * as Survey from "survey-react";
import supabase from "../../supabase/supabaseClient";
import { useUser } from "@clerk/clerk-react"; 
import { json } from "./json";
import "survey-react/survey.css";

const SurveyComp = () => {
  const { user } = useUser();
  const userId = user?.id; 
  const [hasCompletedSurvey, setHasCompletedSurvey] = useState(false);
  const [surveyData, setSurveyData] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);

  // Check if the user has completed the survey
  const checkSurveyStatus = async () => {
    setLoading(true);
    try {
      // Query the survey responses for the user
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
        // If there's a row, assume the user has completed the survey
        setHasCompletedSurvey(true);
        setSurveyData(data.answers);
      } else {
        // If no row is found, the user hasn't completed the survey
        setHasCompletedSurvey(false);
      }
    } catch (err) {
      console.error("Unexpected error while checking survey status:", err);
      setError("Failed to check survey status.");
    } finally {
      setLoading(false);
    }
  };

  // Save or update survey answers
  const handleSurveyComplete = async (sender) => {
    const surveyData = sender.data; // Get the survey answers
    
    try {
      // Check if the user already has a survey response
      const { data, error } = await supabase
        .from("survey_responses")
        .select("id")
        .eq("user_id", userId)
        .maybeSingle(); 

      if (error) {
        console.error("Error checking survey status:", error);
        return;
      }

      // If the user already has a survey response, update it
      if (data) {
        const { error: updateError } = await supabase
          .from("survey_responses")
          .update({ answers: surveyData })
          .eq("id", data.id); // Use the existing survey response ID

        if (updateError) {
          console.error("Error updating survey data:", updateError);
        } else {
          console.log("Survey data updated successfully.");
        }
      } else {
        // If the user doesn't have a survey response, insert a new one
        const { error: insertError } = await supabase
          .from("survey_responses")
          .insert([{ user_id: userId, answers: surveyData }]);

        if (insertError) {
          console.error("Error saving survey data:", insertError);
        } else {
          console.log("Survey data saved successfully.");
        }
      }
      
      // Recheck the survey status after saving or updating
      await checkSurveyStatus();

    } catch (err) {
      console.error("Unexpected error during survey handling:", err);
    }
  };

  const survey = new Survey.Model(json); 
  survey.onComplete.add(handleSurveyComplete);

  useEffect(() => {
    if (userId) {
      checkSurveyStatus();
    } else {
      setLoading(false);
    }
  }, [userId]);

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
      <div style={{ padding: "20px" }}>
        <h1>Survey</h1>
        <Survey.Survey model={survey} />
      </div>
    );
  }

  // Render survey results if the user has completed it
  return (
    <div className="container my-5">
      <h1 className="text-center mb-5">Your Survey Responses</h1>
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
