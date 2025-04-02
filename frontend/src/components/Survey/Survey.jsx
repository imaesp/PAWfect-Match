import React, { useState } from "react";
import * as Survey from "survey-react";
import { useUser } from "@clerk/clerk-react"; 
import { json } from "./json";
import "survey-react/survey.css";
import { theme } from "./survey_theme";
import "./Survey.scss";
import { Link } from "react-router-dom";
import useUpdateSurveyResponse from "../../hooks/useUpdateSurveyResponses";
import useSurveyResponsesQuery from "../../hooks/useSurveyResponsesQuery";
import { useQueryClient } from "@tanstack/react-query"; 

const SurveyComp = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { user } = useUser();
  const user_id = user?.id; 
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useSurveyResponsesQuery(user_id);
  const updateSurveyResponse = useUpdateSurveyResponse();

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <p className="text-secondary fs-4">Loading...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <p className="text-danger fs-5">Error</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <p className="text-danger fs-5">No data Found</p>
      </div>
    );
  }

  const survey = new Survey.Model(json);
  survey.applyTheme(theme);

  
  if (data?.answers) {
    survey.data = data.answers; // Pre-fill survey with stored responses
  }

  survey.onComplete.add((sender) => {
    const results = sender.data;
    updateSurveyResponse.mutate(
      { user_id, answers: results },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(["surveyResponses", user_id]); // Refresh data
          setIsEditing(false);
        },
      }
    );
  });

  const questionLabels = {
    age: "Preferred Age",
    sex: "Preferred Sex",
    size: "Preferred Size",
    budget: "My Budget (Approximate)",
    species: "Preferred Species",
    OutHours: "My Out Hours",
    PlayHours: "Play Hours",
    livingArea: "My Living Area",
    activityLevel: "Preferred Activity Level",
    outdoorAccess: "My Outdoor Access",
  };

  if (isEditing) { 
    return (
      <div className="survey-container">
        <Survey.Survey className="survey-model" model={survey} />
      </div>
    );
  }

  return (
    <div className="survey-results-container fade-in">
      <h1 className="title text-center mb-5">Your Survey Responses</h1>
      <ul className="list-group">
        {Object.entries(data?.answers).map(([question, answer]) => (
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
        onClick={() => setIsEditing(true)}
        style={{ height: "65px", gap: "20px" }}
      >
        Edit Survey
      </button>
      <Link to="/">
        <button className="btn btn-primary mt-4 big-boy">See Matches</button>
      </Link>
    </div>
  );
};

export default SurveyComp;
