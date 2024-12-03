import React, {useState, useEffect} from 'react'
import SurveyComponent from '../../components/Survey/SurveyComponent'
import Card from '../../components/Card/Card'
import SurveyComp from '../../components/Survey/Survey'

function SurveyPage() {
  return (
    <div>
        <h1>Survey Page</h1>
        <SurveyComp></SurveyComp>
    </div>
  )
}

export default SurveyPage