import React from "react";
import { Model } from "survey-core";
import { Survey } from "survey-react-ui";
import "survey-core/defaultV2.min.css";
import { json } from "./json";
import axios from 'axios'
import {useUser} from "@clerk/clerk-react";

function SurveyComponent() {
    const {user} = useUser();
<<<<<<< Updated upstream
    localStorage.setItem('userId', user.id)
=======
    console.log(user.emailAddresses)
    localStorage.setItem('userEmail', user.emailAddresses)
    console.log("local storage value: " + localStorage.getItem('userEmail'))
>>>>>>> Stashed changes


    const survey = new Model(json);
    survey.onComplete.add(() => {
        axios.post("http://localhost:5001/survey", {
            data: survey.data,
<<<<<<< Updated upstream
            email: user.id
=======
            email: user.emailAddresses
>>>>>>> Stashed changes
        })
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        })
    });
<<<<<<< Updated upstream
    return (<Survey model={survey}/>);
=======
    return (<Survey id='survey' model={survey}/>);
>>>>>>> Stashed changes
}

export default SurveyComponent;