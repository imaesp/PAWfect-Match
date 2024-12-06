import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignedIn.scss";

function SignedCard() {
  const [isGetStartedClicked, setGetStartedClicked] = useState(false);

  const navigate = useNavigate();
  const updateAction = () => {
    setGetStartedClicked(true);
    navigate("/adopt");
  };

  return (
    <>
      <div className="card-container-2 col container" style={{ maxWidth: "320px" }}>
        {/* Row for Images */}
        <div className="row justify-content-center g-2">
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
          <div className="col text-center" style={{ paddingBottom: "20px" }}>
            <h1>The Results are in!</h1>
            <p>Your Matches Await</p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="row flex-column align-items-center mt-3">
          <div
            className="col text-center flex-container"
            style={{
              borderTop: "2px solid black",
              margin: "10px 0",
              width: "250px",
            }}
          >
            <p onClick={updateAction}>View Matches</p>
            <button className="btn questionnaire_arrow" onClick={updateAction}>
              <img
                style={{ width: "22px" }}
                src="/arrow_2.jpeg"
                className="img-fluid"
                alt="arrow to questionnaire"
              />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignedCard;
