import React from 'react'
import Navbar from '../../components/Navbar/Navbar.jsx'
import Feed from '../../components/Feed/Feed.jsx'
import NearYou from '../../components/NearYou/NearYou.jsx'
import './Hero.scss'

function Hero() {
  return (
    <section>
        <Navbar></Navbar>
        <NearYou></NearYou>
        <Feed></Feed>
    </section>
  )
}

export default Hero