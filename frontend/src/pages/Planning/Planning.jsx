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
            <img src="/budget.svg" alt=""/>
            <h1>BUDGETING TOOL</h1>
            <p> Track your expenses and manage ongoing pet care costs</p>
            <Link to='/budget'><button class="btn">Learn more</button></Link>
          </div>
        </div>
        <div class="col">
        <div class="container text-center">
            <img src="dog.png" alt=""/>
            <h1>MATCHMAKER</h1>
            <p>Personalized pet recommendations based on your preferences and lifestyle.</p>
            <Link to='/survey'><button class="btn">Learn more</button></Link>
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