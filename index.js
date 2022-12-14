async function fetchAndRenderCityData() {
  try {
    const city = document.getElementById("city").value;
    const cityData = await fetchCityData(city);
    renderCityData(city, cityData);
    if (cityData.length === 0) {
      const p = document.getElementById("p");
      const noCityFoundMessage = document.createTextNode("No city found; try again please.");
      clear(p);
      p.style.color = "#ffc857ff";
      p.appendChild(noCityFoundMessage);
    }
  } catch(error) {
    const p = document.getElementById("p");
    const errorMessage = document.createTextNode("Error; try again please.");
    clear(p);
    p.style.color = "#ffc857ff";
    p.appendChild(errorMessage);
  }
};
const btn = document.getElementById("btn");
btn.addEventListener("click", fetchAndRenderCityData);

async function fetchCityData(city) {
  const response = await fetch("https://dataservice.accuweather.com/locations/v1/cities/search?apikey=YgW6GPXAQeWvMMbqvDAhlpLV1nlL1FZ7&q=" + city, {mode: 'cors'})
  const allCityData = await response.json();
  let allKeysAreasCountries = [];
  allCityData.forEach((object) => {
    allKeysAreasCountries.push([object.Key, object.AdministrativeArea.EnglishName, object.Country.EnglishName]);
  });
  return allKeysAreasCountries;
};

const renderCityData = (city, cityData) => {
  const p = document.getElementById("p");
  clear(p);
  const searchResults = document.getElementById("search-results");
  clear(searchResults);
  const weatherResults = document.getElementById("weather-results");
  clear(weatherResults);
  weatherResults.style.display = "none";
  cityData.forEach((array) => {
    const btn = document.createElement("button");
    btn.textContent = "Get Weather!";
    btn.style.padding = "5px 10px";
    btn.style.margin = "5px 10px";
    btn.style.color = "#8de969ff";
    const cityAreaCountry = document.createTextNode(capitalizeFirstLetters(city) + ", " + array[1] + ", " + array[2]);
    btn.onclick = () => {
      fetchAndRenderWeatherData(array[0], cityAreaCountry);
    };
    searchResults.style.display = "block";
    searchResults.appendChild(btn);
    searchResults.appendChild(cityAreaCountry);
    linebreak = document.createElement("br");
    searchResults.appendChild(linebreak);
  });
};

async function fetchAndRenderWeatherData(locationKey, cityAreaCountry) {
  try {
    const weatherData = await fetchWeatherData(locationKey);
    renderWeatherData(weatherData, cityAreaCountry);
  } catch(error) {
    const p = document.getElementById("p");
    const errorMessage = document.createTextNode("Error; try again please.");
    clear(p);
    p.style.color = "#ffc857ff";
    p.appendChild(errorMessage);
  }
};

async function fetchWeatherData(locationKey) {
  const response = await fetch("https://dataservice.accuweather.com/currentconditions/v1/" + locationKey + "?apikey=YgW6GPXAQeWvMMbqvDAhlpLV1nlL1FZ7&details=true", {mode: 'cors'})
  const allWeatherData = await response.json();
  const selectedWeatherData = {
    summary: allWeatherData[0].WeatherText,
    tempInF: allWeatherData[0].Temperature.Imperial.Value,
    tempInC: allWeatherData[0].Temperature.Metric.Value,
    humidity: allWeatherData[0].RelativeHumidity,
    iconValue: allWeatherData[0].WeatherIcon
  }
  return selectedWeatherData;
}

const renderWeatherData = (weatherData, cityAreaCountry) => {
  const p = document.getElementById("p");
  clear(p);
  const searchResults = document.getElementById("search-results");
  clear(searchResults);
  const weatherResults = document.getElementById("weather-results");
  clear(weatherResults);
  searchResults.style.display = "none";
  weatherResults.style.display = "block";
  const summary = document.createTextNode(weatherData.summary);
  const tempInF = document.createTextNode("Temperature (F): " + weatherData.tempInF);
  const tempInC = document.createTextNode("Temperature (C): " + weatherData.tempInC);
  const humidity = document.createTextNode("Humidity: " + weatherData.humidity);
  const icon = document.createElement("img");
  icon.src = "icons/" + weatherData.iconValue + ".png";
  icon.style.borderRadius = "10%";
  icon.style.margin = "20px 0px 5px 0px";
  const properties = [cityAreaCountry, icon, summary, tempInF, tempInC, humidity];
  properties.forEach((property) => {
    weatherResults.appendChild(property);
    linebreak = document.createElement("br");
    weatherResults.appendChild(linebreak);
  });
}

const clear = (e) => {
  while (e.firstChild) {
    e.removeChild(e.firstChild);
  }
};

function capitalizeFirstLetters(string) {
  let arr = string.split(" ");
  arr = arr.map((word) => {
    return word[0].toUpperCase() + word.slice(1).toLowerCase();
  });
  return arr.join(" ");
}

// prevent submission of form if Enter is pressed
document.getElementById("form").onkeydown = function(e) {
  if (e.key === "Enter") {
    e.preventDefault();
  }
}
