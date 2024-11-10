import React from 'react'
import NearYou from '../../pages/NearYou/NearYou.jsx'
import LandingSection from '../LandingSection/LandingSection.jsx'
import Journey from '../Journey/Journey.jsx'
import './Hero.scss'



function Hero() {
  return (
    <div>
      <LandingSection></LandingSection>
      <Journey></Journey>
      <NearYou></NearYou>
    </div>
  )
}

export default Hero