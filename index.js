async function fetchWeather() {
  try {
    const city = document.getElementById("city").value;
    const state = document.getElementById("state").value;
    const country = document.getElementById("country").value;
    const response = await fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "," + state + "," + country + "&APPID=2fa07d454345910bbe52c05e16f97674",
          {mode: 'cors'}
         )
    const allData = await response.json();
    const selectedWeatherData = {
      latitude: allData.coord.lat,
      longitude: allData.coord.lon,
      description: allData.weather[0].description,
      temperature: allData.main.temp,
      feelsLike: allData.main.feels_like,
      minTemperature: allData.main.temp_min,
      maxTemperature: allData.main.temp_max
    }
    const p = document.getElementById("p");
    const latitude = document.createTextNode("Latitude: " + selectedWeatherData.latitude);
    const longitude = document.createTextNode("Longitude: " + selectedWeatherData.longitude);
    const description = document.createTextNode("Weather: " + selectedWeatherData.description);
    const temperature = document.createTextNode("Temperature now: " + selectedWeatherData.temperature);
    const feelsLike = document.createTextNode("Feels Like: " + selectedWeatherData.feelsLike);
    const minTemperature = document.createTextNode("Today's minimum temperature: " + selectedWeatherData.minTemperature);
    const maxTemperature = document.createTextNode("Today's maximum temperature: " + selectedWeatherData.maxTemperature);
    p.appendChild(latitude);
    linebreak = document.createElement("br");
    p.appendChild(linebreak);
    p.appendChild(longitude);
    linebreak = document.createElement("br");
    p.appendChild(linebreak);
    p.appendChild(description);
    linebreak = document.createElement("br");
    p.appendChild(linebreak);
    p.appendChild(temperature);
    linebreak = document.createElement("br");
    p.appendChild(linebreak);
    p.appendChild(feelsLike);
    linebreak = document.createElement("br");
    p.appendChild(linebreak);
    p.appendChild(minTemperature);
    linebreak = document.createElement("br");
    p.appendChild(linebreak);
    p.appendChild(maxTemperature);
    console.log("allData:", allData);
    console.log("selectedWeatherData", selectedWeatherData);
  } catch(error) {
    console.log("Error; try again please.")
  }
}
const btn = document.getElementById("btn");
btn.addEventListener("click", fetchWeather);

