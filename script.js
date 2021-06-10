//  global variables
//  reference the DOM
//  function: render search history (with a for loop)
//  function: append for local storage
//  function: initiate search history/grab from local storage
//  function: render current weather - that will build the card
//  function: render a forecast card
//  function: render the forecast (with a for loop)
//  function: render items (current weather for the render forecast function)
//  function: fetch function with coordinates
//  function: handle search forms
//  function: handle search history click


var issueContainer = document.getElementById('issues');
var clouds = document.createElement('h3');
var temp = document.createElement('h3');
var wind = document.createElement('h3');
var cityString
var requestAPI
var fetchButton = document.getElementById('fetch-button');
var weatherEl = document.getElementById('weather1');



var weatherButton = document.getElementById("weatherButton")
var userInputEl = document.getElementById("userInput")
function weather() {
}

var city
console.log(city)
  
if (city != null) {
    console.log("function")
    requestAPI = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=f57cc3d88487e632b111d5d350ce8f21&units=imperial";
       getWeather();
   }

function getCity(){

    
       console.log("click")
       var city = userInputEl.value
       console.log(userInputEl.value)
       localStorage.setItem("city", JSON.stringify(city));
       
     
       console.log(city)
       requestAPI = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=f57cc3d88487e632b111d5d350ce8f21&units=imperial";
       getWeather();

};
weatherButton.addEventListener("click", getCity)   


     
   if (city != null) {
    console.log(city)
    requestAPI = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=f57cc3d88487e632b111d5d350ce8f21&units=imperial";
       getWeather();
   }
   
function getWeather() {
    fetch(requestAPI)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
       console.log(data)
        console.log("request for data code is " + data.weather[0].id + " and requested icon is " + data.weather[0].icon);
        var code = data.weather[0].id
        matchIngredient(code)
  
        clouds.textContent = data.weather[0].description;
        temp.textContent = "a temperature of " + data.main.temp + " degrees farenheit";
        wind.textContent = "and an average wind speed of " + data.wind.speed + " mph";
        issueContainer.append(clouds);
        issueContainer.append(temp);
        issueContainer.append(wind);
        myWeather = data.weather[0].description
    });
        