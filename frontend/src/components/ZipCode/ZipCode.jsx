import React, { useState } from "react";
import axios from "axios";

const ZipCodeDistance = () => {
  const [zipcode1, setZipcode1] = useState("");
  const [zipcode2, setZipcode2] = useState("");
  const [distance, setDistance] = useState(null);
  const [error, setError] = useState("");

  const calculateDistance = async () => {
    // Validate zip codes
    if (
      zipcode1.length !== 5 ||
      !/^\d+$/.test(zipcode1) ||
      zipcode2.length !== 5 ||
      !/^\d+$/.test(zipcode2)
    ) {
      setError("Please enter valid 5-digit zip codes.");
      return;
    }

    setError(""); // Clear any previous errors
    setDistance(null); // Clear previous distance result

    const url = `http://localhost:5001/distance/${zipcode1}/${zipcode2}`; // Updated endpoint

    try {
      const response = await axios.get(url);
      if (response.data.distance) {
        setDistance(response.data.distance);
      } else {
        setError("Unable to calculate distance.");
      }
    } catch (err) {
      setError(
        err.response?.data?.error || "An error occurred while fetching the distance."
      );
    }
  };

  return (
    <div>
      <h2>Zip Code Distance Calculator</h2>
      <div>
        <label>
          Zip Code 1:
          <input
            type="text"
            value={zipcode1}
            onChange={(e) => setZipcode1(e.target.value.substring(0, 5))}
          />
        </label>
      </div>
      <div>
        <label>
          Zip Code 2:
          <input
            type="text"
            value={zipcode2}
            onChange={(e) => setZipcode2(e.target.value.substring(0, 5))}
          />
        </label>
      </div>
      <button onClick={calculateDistance}>Calculate Distance</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {distance !== null && (
        <p>
          Distance between {zipcode1} and {zipcode2}: {distance} miles
        </p>
      )}
    </div>
  );
};

export default ZipCodeDistance;
