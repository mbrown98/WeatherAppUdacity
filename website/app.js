// const { get } = require("http");

/* Global Variables */

//Three Global Variables Created
// 1. baseURL of OpenWeatherAPI
// 2. nodeServerLocation: the location where my Node/Express Server is running
// 3. cred: my api key for the OpenWeather API

const baseURL = `http://api.openweathermap.org/data/2.5/weather?zip=`;
const nodeServerLocation = "http://localhost:8000/data";
const cred = "4ff7b7a5217aec7a84d6b9e040657f30";

//adding an eventListener to the generate button so that it will run the needed function on click
document.getElementById("generate").addEventListener("click", () => {
  getWeatherData(baseURL, cred);
});

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

//this function will fetch the weather data from the api
//it takes the three params as specified in guidelines
const apiWeatherFetch = async (baseURL, zipCode, apiKey) => {
  //fetching data
  const response = await fetch(baseURL + zipCode + ",us&appid=" + apiKey);
  try {
    const weatherData = await response.json();
    //if the weatherData is succesfully recieved/converted it will return that object
    return weatherData;
  } catch (error) {
    console.log("error", error);
  }
};

const getWeatherData = async (baseURL, apiKey) => {
  //grabbing the values of the user feelings and zip from the page
  const userInput = document.getElementById("feelings").value;
  let zipCode = document.getElementById("zip").value;
  //if zipCode has not been entered, alert the user, and use 10001 as a placeholder
  if (!zipCode) {
    window.alert("Please Add a Zip Code");
    zipCode = 10001;
  }
  if (!userInput) {
    window.alert("Please Add Your Feelings");
  }
  //fetch weatherData
  apiWeatherFetch(baseURL, zipCode, apiKey)
    .then(async (data) => {
      //the response object should be all the weather info from the API
      //add the user inputs to the data object
      data.newDate = newDate;
      data.userInput = userInput;
      //send a post request to the Node server
      try {
        const response = await fetch(nodeServerLocation, {
          method: "POST",
          credentials: "same-origin",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        return response;
      } catch (error) {
        console.log("error", error);
      }
    })
    .then(async (data) => {
      //if successful the data object will have all the info needed to add to page
      try {
        const response = await data.json();
        document.getElementById("date").innerHTML = "Date: " + response.date;
        document.getElementById("temp").innerHTML =
          "Temp: " + response.temperature + " Kelvins";
        document.getElementById("content").innerHTML =
          "Content: " + response.userInput;
      } catch (error) {
        console.log("error", error);
      }
    });
};
