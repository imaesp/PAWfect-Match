import React from 'react'
import NearYou from '../../pages/NearYou/NearYou.jsx'
import LandingSection from '../LandingSection/LandingSection.jsx'
import Journey from '../Journey/Journey.jsx'
import Footer from '../../components/Footer/Footer.jsx'
import DidYouKnow from '../DidYouKnow/DidYouKnow.jsx'
import Planning from '../Planning/Planning.jsx'
import PawPrintLtoR from '../../components/PawPrintAnimation/PawPrintLtoR.jsx'
import PawPrintRtoL from '../../components/PawPrintAnimation/PawPrintRtoL.jsx'
import './Hero.scss'

function Hero() {
  return (
    <div className='hero-container'>
      <LandingSection></LandingSection>
      <PawPrintLtoR></PawPrintLtoR>
      <Journey></Journey>
      <DidYouKnow></DidYouKnow>
      <NearYou></NearYou>
      <PawPrintRtoL></PawPrintRtoL>
      <Planning></Planning>
      <Footer></Footer>
    </div>

  )
}

export default Hero