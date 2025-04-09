import React, {useState, useEffect} from 'react'
import SurveyComp from '../../components/Survey/Survey'
import './SurveyPage.scss'

function SurveyPage() {
  return (
    <div className='survey-container'>
        <SurveyComp></SurveyComp>
    </div>
  )
}

export default SurveyPage