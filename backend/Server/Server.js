var bodyParser = require("body-parser");
const express = require("express");
const path = require("path");
var cors = require("cors");

const app = express();
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cors())


let surveys = {};

<<<<<<< Updated upstream
app.post("/survey", (req, res) => {
    if(req.body.id in surveys){
        surveys[req.body.id].push(req.body.data)
        console.log(surveys)
    } else{
        surveys[req.body.id] = []
        surveys[req.body.id].push(req.body.data)
=======

app.post("/survey", (req, res) => {
    const email = JSON.stringify(req.body.email);
    const parsedEmail = JSON.parse(email);
    const emailAddress = parsedEmail[0].emailAddress;
    if(emailAddress in surveys){
        surveys[emailAddress].push(req.body.data)
        console.log(surveys)
    } else{
        surveys[emailAddress] = []
        surveys[emailAddress].push(req.body.data)
>>>>>>> Stashed changes
        console.log(surveys)
    }
    res.end()
})

<<<<<<< Updated upstream
=======
app.get("/:email/survey", (req, res) => {
    if(surveys[req.params.email] === undefined){
        res.json([])
    } else {
        res.json(surveys[req.params.email])
    }

})

>>>>>>> Stashed changes

app.get("/", (req, res) => {
    res.send("Hello")
})


const port = process.env.PORT || 5001;
app.listen(port);

console.log("App is listening on port: " + port)