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

function displayWeatherForecast(response) {
  document.querySelector("h1").innerHTML = response.data.name;

  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;

  tempCelsius = Math.round(response.data.main.temp);
  document.querySelector("#temperature").innerHTML = tempCelsius;

  tempMax = Math.round(response.data.main.temp_max);
  document.querySelector("#temp-max").innerHTML = `${tempMax}°C`;

  tempMin = Math.round(response.data.main.temp_min);
  document.querySelector("#temp-min").innerHTML = `${tempMin}°C`;

  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );

  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );

  let iconName = response.data.weather[0].icon;
  showIcon(iconName);

  let d = new Date();
  let localTime = d.getTime();
  let localOffset = d.getTimezoneOffset() * 60000;
  let utc = localTime + localOffset;
  let nDate = new Date(utc + 1000 * response.data.timezone);
  console.log(nDate);
  document.querySelector("#current-date").innerHTML = formattedDate(nDate);
}

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

function showTempFahrenheit(event) {
  event.preventDefault();
  fahrenheit.classList.add("active");
  celsius.classList.remove("active");
  document.querySelector("#temperature").innerHTML = Math.round(
    tempCelsius * 1.8 + 32
  );
  document.querySelector("#temp-max").innerHTML = `${Math.round(
    tempMax * 1.8 + 32
  )}°F`;
  document.querySelector("#temp-min").innerHTML = `${Math.round(
    tempMin * 1.8 + 32
  )}°F`;
}

function showTempCelsius(event) {
  event.preventDefault();
  celsius.classList.add("active");
  fahrenheit.classList.remove("active");
  document.querySelector("#temperature").innerHTML = Math.round(tempCelsius);
  document.querySelector("#temp-max").innerHTML = `${Math.round(tempMax)}°C`;
  document.querySelector("#temp-min").innerHTML = `${Math.round(tempMin)}°C`;
}

let icons = {
  "01d": { name: "fas fa-sun" },

  "02d": { name: "fas fa-cloud-sun" },

  "01n": { name: "fas fa-moon" },

  "02n": { name: "fas fa-cloud-moon" },

  "03d": { name: "fas fa-cloud" },

  "04d": { name: "fas fa-cloud" },

  "03n": { name: "fas fa-cloud" },

  "04n": { name: "fas fa-cloud" },

  "09d": { name: "fas fa-cloud-showers-heavy" },

  "09n": { name: "fas fa-cloud-showers-heavy" },

  "10n": { name: "fas fa-cloud-sun-rain" },

  "10d": { name: "fas fa-cloud-moon-rain" },

  "11d": { name: "fas-fa-bolt" },

  "11n": { name: "fas-fa-bolt" },

  "13d": { name: "fas fa-snowman" },

  "13n": { name: "fas fa-snowman" },

  "50d": { name: "fas fa-smog" },

  "50n": { name: "fas fa-smog" },
};

function showIcon(icon) {
  if (icons[icon] !== undefined) {
    let iconElement = icons[icon].name;
    let mainIcon = document.querySelector("#main-icon");
    mainIcon.setAttribute("class", iconElement);
  }
}

let buttonCurrentCity = document.querySelector("#current-city-button");
buttonCurrentCity.addEventListener("click", showCurrentCity);

let enterCityForm = document.querySelector("#enter-city-form");
enterCityForm.addEventListener("submit", handleEvent);

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", showTempFahrenheit);

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", showTempCelsius);

let tempCelsius = null;
let tempMax = null;
let tempMin = null;

search("Berlin");
