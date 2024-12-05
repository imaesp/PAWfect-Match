import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

let surveys = {};

// Handle survey submissions
app.post("/survey", (req, res) => {
  const email = JSON.stringify(req.body.email);
  const parsedEmail = JSON.parse(email);
  const emailAddress = parsedEmail[0].emailAddress;
  if (emailAddress in surveys) {
    surveys[emailAddress].push(req.body.data);
    console.log(surveys);
  } else {
    surveys[emailAddress] = [];
    surveys[emailAddress].push(req.body.data);
    console.log(surveys);
  }
  res.end();
});

// Fetch survey data for a given email
app.get("/:email/survey", (req, res) => {
  if (surveys[req.params.email] === undefined) {
    res.json([]);
  } else {
    res.json(surveys[req.params.email]);
  }
});

// Distance calculation functionality
app.get("/distance/:zipcode1/:zipcode2", async (req, res) => {
  const { zipcode1, zipcode2 } = req.params;
  const API_KEY = process.env.ZIP_KEY;
  const url = `https://www.zipcodeapi.com/rest/${API_KEY}/distance.json/${zipcode1}/${zipcode2}/mile`;

  try {
    const response = await axios.get(url);
    res.json(response.data); // Send the response back to the frontend
  } catch (error) {
    console.error("Error fetching distance:", error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      error: error.response?.data?.error_msg || "An error occurred",
    });
  }
});

// Default route
app.get("/", (req, res) => {
  res.send("Hello");
});

const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log("App is listening on port: " + port);
});
