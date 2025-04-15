/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import useSurveyResponsesQuery from '../../hooks/useSurveyResponsesQuery.js';
import { useUser } from '@clerk/clerk-react';
import './Card.scss';

// Clerk complains that we are already Logged in, so we cannot show the Login modal once we have a user.
// if data ? Link to /survey : user ? Link to survey : Show Login Modal
function Card() {

  const { user } = useUser();
  const { 
    data, 
    isLoading, 
    isError 
  } = useSurveyResponsesQuery(user?.id);

  return (
    <>
    <div className="card-container col container" style={{  maxWidth: '320px'}}>

      {/* Row for Images */}
      <div className="row justify-content-center g-2" >
        <div className="col-auto">
          <div className="petsIMG">
            <img src="/pet_1.jpeg" alt="pet-1" />
          </div>
        </div>
        <div className="col-auto">
          <div className="petsIMG">
            <img src="/pet_2.jpeg" alt="pet-2" />
          </div>
        </div>
        <div className="col-auto">
          <div className="petsIMG">
            <img src="/pet_3.jpeg" alt="pet-3" />
          </div>
        </div>
      </div>

      {/* Row for Text and Action */}
      <div className="row flex-column align-items-center mt-3">
        <div className="col text-center" style={{ paddingBottom: '20px'}}>
          <h1>Find Your Match</h1>
          <p>By Taking the Quiz</p>
        </div>
      </div>

      {/* Call to Action */}
      <div className="row flex-column align-items-center mt-3">
        {data ? (
          <div className="col text-center flex-container"  style={{ borderTop: '2px solid black', margin: '10px 0', width: '250px' }}>
              <Link to='/survey'><p role="button">Get Started</p></Link>
              <Link to='/survey'><button className="btn questionnaire_arrow">
                <img style={{ width: '26px' }} src="/arrow_2.jpeg" className="img-fluid" alt="arrow to questionnaire" />
              </button></Link> 
          </div>
        ) : user ? (
          <div className="col text-center flex-container"  style={{ borderTop: '2px solid black', margin: '10px 0', width: '250px' }}>
              <Link to='/survey'><p role="button">Get Started</p></Link>
              <Link to='/survey'><button className="btn questionnaire_arrow">
                <img style={{ width: '26px' }} src="/arrow_2.jpeg" className="img-fluid" alt="arrow to questionnaire" />
              </button></Link> 
          </div>
        ) : (
          <div className="col text-center flex-container"  style={{ borderTop: '2px solid black', margin: '10px 0', width: '250px' }}>
            <SignInButton mode="modal">
              <Link><p role="button">Get Started</p></Link>
            </SignInButton>
            <SignInButton mode="modal">
              <Link><button className="btn questionnaire_arrow">
                <img style={{ width: '26px' }} src="/arrow_2.jpeg" className="img-fluid" alt="arrow to questionnaire" />
              </button></Link> 
            </SignInButton>
          </div>
        )}
      </div>
    </div>
   </>
  );
}

export default Card;