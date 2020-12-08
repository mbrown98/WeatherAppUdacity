// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
// app.use(express.static("website"));
app.use(express.static("dist"));

const port = 8000;
// Setup Server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

app.get("/data", function (req, res) {
  //sends back current state of projectData

  res.send(projectData);
});

app.post("/data", function (req, res) {
  //takes needed values from req, and adds them to projectData
  projectData.temperature = req.body.main.temp;
  projectData.date = req.body.newDate;
  projectData.userInput = req.body.userInput;
  //sends back updated projectData
  res.send(projectData);
});
