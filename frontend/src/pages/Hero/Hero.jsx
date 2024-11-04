import React from 'react'
import Navbar from '../../components/Navbar/Navbar.jsx'
import NearYou from '../../pages/NearYou/NearYou.jsx'
import LandingSection from '../LandingSection/LandingSection.jsx'
import Journey from '../Journey/Journey.jsx'
import './Hero.scss'


function Hero() {
  return (
    <div>
      <Navbar></Navbar>
      <LandingSection></LandingSection>
      <Journey></Journey>
      <NearYou></NearYou>
    </div>
  )
}

export default Hero