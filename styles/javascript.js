let weather = {
  paris: {
    displayName: "Paris",
    temp: 19.7,
    humidity: 80,
  },
  tokyo: {
    displayName: "Tokyo",
    temp: 17.3,
    humidity: 50,
  },
  lisbon: {
    displayName: "Lisbon",
    temp: 30.2,
    humidity: 20,
  },
  "san francisco": {
    displayName: "San Francisco",
    temp: 20.9,
    humidity: 100,
  },
  moscow: {
    displayName: "Moscow",
    temp: -5,
    humidity: 20,
  },
};

let city = prompt("Enter a city name");
city = city.trim().toLowerCase();

if (weather[city] !== undefined) {
  let temperature = weather[city].temp;
  let temperatureCelsius = Math.round(temperature);
  let temperatureFahrenheit = Math.round((temperature - 32) * 0.5556);
  let humidity = weather[city].humidity;
  let displayName = weather[city].displayName;
  alert(
    `It is currently ${temperatureCelsius}°C (${temperatureFahrenheit}°F) in ${displayName} with a humidity of ${humidity}%.`
  );
} else {
  alert(
    `Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+${city}`
  );
}

function isWindy(windSpeed) {
  if (windSpeed > 5) {
    alert(`It's windy.`);
  } else {
    alert(`It's not windy.`);
  }
}
isWindy(0);
let windSpeed = prompt(`What is the speed of wind today?`);
isWindy(windSpeed);
