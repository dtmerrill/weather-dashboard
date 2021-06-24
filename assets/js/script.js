// City Search Management - empty array for city searches
// City Search Management - returns up to 13 prior citys out of local storage (13 fit on my laptop screen without scrolling)
// City Search Management - saves the city to the list
// Weather Call - first call for location codes and current weather/icon from the api
// Weather Call - second call for uv index information
// Weather Call - final call for forecast information/icons from the api
// Forecast Display - loads the forecast cards
// City Search Management - makes prior city list items clickable
// City Search Management - empties the "search for a city" box

// City Search Management - empty array for city searches
var searchHistory = [];

// City Search Management - returns up to 13 prior citys out of local storage (13 fit on my laptop screen without scrolling)
function getItems() {
  var storedCities = JSON.parse(localStorage.getItem("searchHistory"));
  console.log("searcHistory");
  if (storedCities !== null) {
    searchHistory = storedCities;
  }
  for (i = 0; i < searchHistory.length; i++) {
    if (i == 13) {
      break;
    }

    listButton = $("<li>").attr({
      class: "list-group-item list-group-item-action",
    });
// City Search Management - saves the city to the list
    listButton.text(searchHistory[i]);
    $(".list-group").append(listButton);
  }
}
var city;
var mainCard = $(".card-body");

getItems();

// Weather Call - first call for location codes and current weather/icon from the api
function getData() {
  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=f57cc3d88487e632b111d5d350ce8f21";
  mainCard.empty();
  $("#weeklyForecast").empty();

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    console.log(getData);

    var date = moment().format(" MM/DD/YYYY", "hh:mm:ss a");

    var iconCode = response.weather[0].icon;
    console.log(response.weather);

    var iconURL = "http://openweathermap.org/img/w/" + iconCode + ".png";

    var name = $("<h3>").html(city + date);

    mainCard.prepend(name);

    mainCard.append($("<img>").attr("src", iconURL));

    var temp = Math.round((response.main.temp - 273.15) * 1.8 + 32);
    mainCard.append($("<p>").html("temperature: " + temp + " &#8457"));
    var humidity = response.main.humidity;
    mainCard.append($("<p>").html("humidity: " + humidity));
    var windSpeed = response.wind.speed;
    mainCard.append($("<p>").html("wind speed: " + windSpeed));

    var lat = response.coord.lat;
    var lon = response.coord.lon;

// Weather Call - second call for uv index information
    $.ajax({
      url:
        "https://api.openweathermap.org/data/2.5/uvi?appid=f57cc3d88487e632b111d5d350ce8f21&lat=" +
        lat +
        "&lon=" +
        lon,
      method: "GET",
    }).then(function (response) {
      mainCard.append(
        $("<p>").html("uv index: <span>" + response.value + "</span>")
      );
      if (response.value <= 2) {
        $("span").attr("class", "btn btn-outline-success");
      }
      if (response.value > 2 && response.value <= 5) {
        $("span").attr("class", "btn btn-outline-warning");
      }
      if (response.value > 5) {
        $("span").attr("class", "btn btn-outline-danger");
      }
    });

// Weather Call - final call for forecast information
    $.ajax({
      url:
        "https://api.openweathermap.org/data/2.5/forecast?q=" +
        city +
        "&appid=f57cc3d88487e632b111d5d350ce8f21",
      method: "GET",
    }).then(function (response) {
      for (i = 0; i < 5; i++) {

// Forecast Display - loads the forecast cards/icons from the api
        var newCard = $("<div>").attr(
          "class",
          "col fiveDay bg-primary text-white rounded-lg p-2"
        );
        $("#weeklyForecast").append(newCard);

        var myDate = new Date(response.list[i * 8].dt * 1000);

        newCard.append($("<h4>").html(myDate.toLocaleDateString()));

        var iconCode = response.list[i * 8].weather[0].icon;

        var iconURL = "http://openweathermap.org/img/w/" + iconCode + ".png";

        newCard.append($("<img>").attr("src", iconURL));

        var temp = Math.round(
          (response.list[i * 8].main.temp - 273.15) * 1.8 + 32
        );

        newCard.append($("<p>").html("Temp: " + temp + " &#8457"));

        var humidity = response.list[i * 8].main.humidity;

        newCard.append($("<p>").html("Humidity: " + humidity));
      }
    });
  });
}

// City Search Management - makes prior city list items clickable
$("#searcher").on("click", "li", function () {
  console.log("this", $(this).text());
  city = $(this).text();

  getData();
});

$("#searchCity").click(function () {
  city = $("#city").val().trim();

  getData();
  var checkArray = searchHistory.includes(city);

  if (checkArray == true) {
    return;
  } else {
    searchHistory.push(city);
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
    var listButton = $("<li>").attr({
      class: "list-group-item list-group-item-action historyItem",
    });
    listButton.text(city);
    $(".list-group").append(listButton);
  }

  $("#city").val("");
});

// City Search Management - empties the "search for a city" box
$("#clear").click(function () {
  window.localStorage.clear();
  location.reload();
  return false;
});