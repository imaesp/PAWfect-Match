import { motion } from "framer-motion";
import "./JComponents.scss";
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'; 

function JComponents() {
  const [isGetStartedClicked, setGetStartedClicked] = useState(false);

  const navigate = useNavigate();
  const updateAction = () => {
    setGetStartedClicked(true);
    navigate('/survey'); 
  }
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
            // repeat: Infinity,
            // repeatType: "loop",
            // repeatDelay: 10,
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
            // repeat: Infinity,
            // repeatType: "loop",
            // repeatDelay: 10,
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
            // repeat: Infinity,
            // repeatType: "loop",
            // repeatDelay: 10,
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
        {/* <div className="first">
          <button className="first-button">1</button>
          <p>Take the quiz</p>
        </div>
        <div className="second">
          <button className="second-button">2</button>
          <p>Adopt your pet</p>
        </div>
        <div className="third">
          <button className="third-button">3</button>
          <p>
            PAWfect Match
            <br />
            found!
          </p>
        </div> */}
      </div>
      <motion.div
        className="second"
        initial={{ opacity: 0, scale: 0.0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          delay: 8,
          duration: 1.0,
          // repeat: Infinity,
          // repeatType: "loop",
          // repeatDelay: 10,
          ease: [0, 0.71, 0.2, 1.01],
        }}
      >
        <button className="survey-button"onClick={updateAction}>Find Your Match!</button>
      </motion.div>
    </div>
  );
}

export default JComponents;