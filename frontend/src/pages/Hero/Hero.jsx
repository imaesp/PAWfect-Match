import React from 'react'
import NearYou from '../../pages/NearYou/NearYou.jsx'
import LandingSection from '../LandingSection/LandingSection.jsx'
import Journey from '../Journey/Journey.jsx'
import Footer from '../../components/Footer/Footer.jsx'
import ArticleList from '../../components/Articles/articleFeed.jsx'
import './Hero.scss'

function Hero() {
  return (
    <div>
      <LandingSection></LandingSection>
      <Journey></Journey>
      <NearYou></NearYou>
      <ArticleList></ArticleList>
      <Footer></Footer>
    </div>

  )
}

export default Hero