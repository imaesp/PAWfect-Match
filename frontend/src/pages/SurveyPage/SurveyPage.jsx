<<<<<<< Updated upstream
import React from 'react'
import SurveyComponent from '../../components/Survey/SurveyComponent'
import Card from '../../components/Card/Card'
function SurveyPage() {
  return (
    <>
        <SurveyComponent></SurveyComponent>
        <Card></Card>
    </>
=======
import React, {useState, useEffect} from 'react'
import SurveyComponent from '../../components/Survey/SurveyComponent'
import Card from '../../components/Card/Card'
import axios from 'axios'


function SurveyPage() {
  return (
    <div>
        <h1>Survey Page</h1>
        <SurveyComponent></SurveyComponent>
        <Card></Card>
    </div>
>>>>>>> Stashed changes
  )
}

export default SurveyPage