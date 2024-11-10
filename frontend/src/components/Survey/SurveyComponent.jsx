import React from "react";
import { Model } from "survey-core";
import { Survey } from "survey-react-ui";
import "survey-core/defaultV2.min.css";
import { json } from "./json";
import axios from 'axios'
import {useUser} from "@clerk/clerk-react";

function SurveyComponent() {
    const {user} = useUser();
    localStorage.setItem('userId', user.id)


    const survey = new Model(json);
    survey.onComplete.add(() => {
        axios.post("http://localhost:5001/survey", {
            data: survey.data,
            email: user.id
        })
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        })
    });
    return (<Survey model={survey}/>);
}

export default SurveyComponent;