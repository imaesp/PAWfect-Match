import React from 'react'
import { Link } from 'react-router-dom';
import "./Planning.scss"

function Planning() {
  return (
    <div class="plan-container text-center">
      <div class="row justify-content-center"><h1 className='title'>Planning on Adopting a Pet?</h1></div>
      <div class="row">
        <div class="col">
          <div class="container text-center">
            <img src="/pet-house.png" alt="" />
            <h1>CHECKLIST FOR ADOPTERS</h1>
            <p>Make the adoption transition as smooth as possible</p>
            <Link to='/checklist'><button class="btn">Learn more</button></Link>
          </div>
        </div>
        <div class="col">
          <div class="container text-center">
            <img src="/faq-icon.png" alt=""/>
            <h1>PET ADOPTION FAQS</h1>
            <p>Get the answers to all your questions about adoption </p>
            <Link to='/checklist'><button class="btn">Learn more</button></Link>
          </div>
        </div>
        <div class="col">
        <div class="container text-center">
            <img src="dog.png" alt=""/>
            <h1>RESOURCES</h1>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ducimus eos suscipit est fugit in nam.</p>
            <Link to='/article'><button class="btn">Learn more</button></Link>
        </div>
      </div>
      </div>
      <div className='dog'>
          <img src="/dog-silhouette.svg" alt="" />
      </div>
    </div>
  )
}

export default Planning