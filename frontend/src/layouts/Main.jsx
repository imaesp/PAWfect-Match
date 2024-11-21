import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'

function Main({child}) {
  return (
    <div>
      <Navbar></Navbar>
      {child}
      <Footer></Footer>
    </div>
  )
}

export default Main