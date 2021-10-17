function formattedDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let currentDay = days[date.getDay()];
  let currentHour = date.getHours();
  let currentMinute = date.getMinutes();

  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }

  if (currentMinute < 10) {
    currentMinute = `0${currentMinute}`;
  }

  return `${currentDay} ${currentHour}:${currentMinute}`;
}

let now = new Date();
let currentDate = document.querySelector("#current-date");
currentDate.innerHTML = formattedDate(now);

function search(city) {
  let apiKey = "a3dbe35b1709ef749ca9620ec001b6b8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherForecast);
}
function handleEvent(event) {
  event.preventDefault();
  let city = document.querySelector("#enter-city").value;
  search(city);
}

function displayWeatherForecast(response) {
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#temp-max").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#temp-min").innerHTML = Math.round(
    response.data.main.temp_min
  );
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
}

let enterCityForm = document.querySelector("#enter-city-form");
enterCityForm.addEventListener("submit", handleEvent);

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "53f3bc1f5d348c44be3e3754c7185573";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherForecast);
}

function showCurrentCity() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let buttonCurrentCity = document.querySelector("#current-city-button");
buttonCurrentCity.addEventListener("click", showCurrentCity);

function showTempCelsius(event) {
  event.preventDefault();
  let tempDisplay = document.querySelector("#temperature");
  let temperature = tempDisplay.innerHTML;
  temperature = Number(temperature);
  tempDisplay.innerHTML = `${Math.round((temperature - 32) / 1.8)}`;
}

function showTempFahrenheit(event) {
  event.preventDefault();
  let tempDisplay = document.querySelector("#temperature");
  let temperature = tempDisplay.innerHTML;
  temperature = Number(temperature);
  tempDisplay.innerHTML = Math.round(temperature * 1.8 + 32);
}

let tempFahrenheit = document.querySelector("#fahrenheit");
tempFahrenheit.addEventListener("click", showTempFahrenheit, { once: true });

let tempCelsius = document.querySelector("#celsius");
tempCelsius.addEventListener("click", showTempCelsius, { once: true });

search("Berlin");