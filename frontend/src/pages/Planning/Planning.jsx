import React from 'react'
import { Link } from 'react-router-dom';
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { useUser } from '@clerk/clerk-react';
import "./Planning.scss"

function Planning() {
  const { user } = useUser();

  return (
    <div className="plan-container text-center">
      <div className="row justify-content-center"><h1 className='title'>Planning on Adopting a Pet?</h1></div>
      <div className="row">
        <div className="col">
          <div className="container text-center">
            <img src="/pet-house.png" alt="" />
            <h1>CHECKLIST FOR ADOPTERS</h1>
            <p>Make the adoption transition as smooth as possible</p>
            <Link to='/checklist'><button className="button">Learn more</button></Link>
          </div>
        </div>
        <div className="col">
          <div className="container text-center">
            <img src="/budget.svg" alt=""/>
            <h1>BUDGETING TOOL</h1>
            <p> Track your expenses and manage ongoing pet care costs</p>
            {user ? (
                <Link to="/budget"><button className="button">Learn more</button></Link>
              ) : (
                <SignInButton mode="modal">
                 <button className="button">Learn more</button>
                </SignInButton>
              )}
          </div>
        </div>
        <div className="col">
        <div className="container text-center">
            <img src="dog.png" alt=""/>
            <h1>MATCHMAKER</h1>
            <p>Personalized pet recommendations based on your preferences and lifestyle.</p>
            {user ? (
                <Link to="/survey"><button className="button">Learn more</button></Link>
              ) : (
                <SignInButton mode="modal">
                 <button className="button">Learn more</button>
                </SignInButton>
              )}
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