var bodyParser = require("body-parser");
const express = require("express");
const path = require("path");
var cors = require("cors");

const app = express();

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cors())

let surveys = {};

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
        console.log(surveys)
    }
    res.end()
})
//sends data back to fronted
app.get("/:email/survey", (req, res) => {
    if(surveys[req.params.email] === undefined){
        res.json([]);
    } else{
        res.json(surveys[req.params.email])
    }
})


app.get("/", (req, res) => {
    res.send("Hello")
})

const port = process.env.PORT || 5001;
app.listen(port);
console.log("App is listening on port: " + port)