
//setting up api
const apiKey = "ff936842a68579d07be624dbf63384ec";
const apiLink = "http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=" + apiKey;
// store the value of the input (aka city location)
let city = $("#searchCity").val();
//set up the date 
let date = new Date();
//
$("#searchCity").keypress(function(event) { 
	if (event.keyCode === 0) { 
		event.preventDefault();
		$("#searchBtn").click(); 
	} 
});
//onclick search bar will function 
$("#searchBtn").on("click", function() {
  // get the value of the input from user
  city = $("#searchCity").val();
  //url to call api
  const queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;
  $.ajax({
      //request and get weather data
    url: queryUrl,
    method: "GET"
  })
  .then(function (response){
    //recording the response/whats given
    getCurrentConditions(response);
    makeList();
    })
  });
  
  function makeList() {
    let listItem = $("<li>").addClass("list-info").text(city);
    $(".list").append(listItem);
  }
  function getCurrentConditions (response) {

    //convert to fahrenheit 
    let tempF = (response.main.temp - 273.15) * 1.80 + 32;
    tempF = Math.floor(tempF);
    //clear
    $('#currentCity').empty();




    // adding infofrom what is given to HTML
    var box= $("<div>").addClass("card");
    var boxBody = $("<div>").addClass("card-body");

    var city = $("<h4>").addClass("card-title").text(response.name);
    var cityDate = $("<h4>").addClass("card-title").text(date.toLocaleDateString('en-US'));
    var temperature = $("<p>").addClass("card-text current-temp").text("Temperature: " + tempF + " °F");
    var humidity = $("<p>").addClass("card-text current-humidity").text("Humidity: " + response.main.humidity + "%");
    var wind = $("<p>").addClass("card-text current-wind").text("Wind Speed: " + response.wind.speed + " MPH");
    city.append(cityDate)
    boxBody.append(city, temperature, humidity, wind);
    box.append(boxBody);
    $("#currentCity").append(box)
   
  }


