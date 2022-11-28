async function fetchAndRenderWeather() {
  try {
    const selectedWeatherData = await fetchWeather();
    renderWeather(selectedWeatherData);
  } catch(error) {
    const p = document.getElementById("p");
    const errorMessage = document.createTextNode("Error; try again please.");
    clearRenderSpace(p);
    p.appendChild(errorMessage);
  }
};
const btn = document.getElementById("btn");
btn.addEventListener("click", fetchAndRenderWeather);

async function fetchWeather() {
  const city = document.getElementById("city").value;
  const state = document.getElementById("state").value;
  const country = document.getElementById("country").value;
  let selectedTemperatureFormat = "f";
  let selectedTemperatureFormatString = "&units=imperial";
  const temperatureFormats = document.getElementsByName('temperature-format');
  temperatureFormats.forEach((temperatureFormat) => {
    if (temperatureFormat.checked) {
      selectedTemperatureFormat = temperatureFormat.value;
    }
  });
  if (selectedTemperatureFormat === "c") {
    selectedTemperatureFormatString = "&units=metric";
  }
  const response = await fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "," + state + "," + country + "&APPID=2fa07d454345910bbe52c05e16f97674" + selectedTemperatureFormatString, {mode: 'cors'})
  const allData = await response.json();
  const selectedWeatherData = {
    latitude: allData.coord.lat,
    longitude: allData.coord.lon,
    summary: allData.weather[0].main,
    details: allData.weather[0].description,
    temperature: allData.main.temp,
    feelsLike: allData.main.feels_like,
    temperatureFormat: selectedTemperatureFormat
  }
  return selectedWeatherData;
};

// START HERE AND CLEAN UP THE PRESENTATION OF THE PROPERTIES (FAHRENHEIT NOT KELVIN E.G.)

const renderWeather = (selectedWeatherData) => {
  const p = document.getElementById("p");
  const latitude = document.createTextNode("Latitude: " + selectedWeatherData.latitude);
  const longitude = document.createTextNode("Longitude: " + selectedWeatherData.longitude);
  const summary = document.createTextNode("Summary: " + selectedWeatherData.summary);
  const details = document.createTextNode("Details: " + selectedWeatherData.details);
  let temperature;
  let feelsLike;
  if (selectedWeatherData.temperatureFormat === "f") {
    temperature = document.createTextNode("Temperature now: " + selectedWeatherData.temperature + "°F");
    feelsLike = document.createTextNode("Feels like: " + selectedWeatherData.feelsLike + "°F");
  } else {
    temperature = document.createTextNode("Temperature now: " + selectedWeatherData.temperature + "°C");
    feelsLike = document.createTextNode("Feels like: " + selectedWeatherData.feelsLike + "°C");
  }
  console.log(temperature);
  const properties = [latitude, longitude, summary, details, temperature, feelsLike];
  clearRenderSpace(p);
  properties.forEach((property) => {
    p.appendChild(property);
    linebreak = document.createElement("br");
    p.appendChild(linebreak);
  });
};

const clearRenderSpace = (p) => {
  while (p.firstChild) {
    p.removeChild(p.firstChild);
  }
};
