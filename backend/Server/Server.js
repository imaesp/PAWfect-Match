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
    if(req.body.id in surveys){
        surveys[req.body.id].push(req.body.data)
        console.log(surveys)
    } else{
        surveys[req.body.id] = []
        surveys[req.body.id].push(req.body.data)
        console.log(surveys)
    }
    res.end()
})


app.get("/", (req, res) => {
    res.send("Hello")
})


const port = process.env.PORT || 5001;
app.listen(port);

console.log("App is listening on port: " + port)