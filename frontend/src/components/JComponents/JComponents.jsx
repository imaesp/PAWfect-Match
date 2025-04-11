import { motion } from "framer-motion";
import "./JComponents.scss";
import React from "react";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { useUser } from '@clerk/clerk-react';
import { Link } from 'react-router-dom'; 

function JComponents() {
  const { user } = useUser();

  return (
    <div className="jc-container">
      <div className="button-container">
        <motion.div
          className="first"
          initial={{ opacity: 0, scale: 0.0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: 2,
            duration: 1.5,
            ease: [0, 0.71, 0.2, 1.01],
          }}
        >
          <button className="first-button">1</button>
          <p>Take the quiz</p>
        </motion.div>
        <motion.div
          className="second"
          initial={{ opacity: 0, scale: 0.0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: 4,
            duration: 1.5,
            ease: [0, 0.71, 0.2, 1.01],
          }}
        >
          <button className="second-button">2</button>
          <p>Adopt your pet</p>
        </motion.div>
        <motion.div
          className="third"
          initial={{ opacity: 0, scale: 0.0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: 6,
            duration: 1.5,
            ease: [0, 0.71, 0.2, 1.01],
          }}
        >
          <button className="third-button">3</button>
          <p>
            PAWfect Match
            <br />
            found!
          </p>
        </motion.div>
      </div>
      <motion.div
        className="second"
        initial={{ opacity: 0, scale: 0.0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          delay: 8,
          duration: 1.0,
          ease: [0, 0.71, 0.2, 1.01],
        }}
      >
        {user ? (
          <Link to="/survey"><button className="survey-button">Find Your Match!</button></Link>
        ) : (
          <SignInButton mode="modal">
            <button className="survey-button">Find Your Match!</button>
          </SignInButton>
        )}
      </motion.div>
    </div>
  );
}

export default JComponents;