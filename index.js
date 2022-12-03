async function fetchAndRenderCityData() {
  try {
    const city = document.getElementById("city").value;
    const cityData = await fetchCityData(city);
    renderCityData(city, cityData);
    if (cityData.length === 0) {
      const p = document.getElementById("p");
      const noCityFoundMessage = document.createTextNode("No city found; try again please.");
      clear(p);
      p.appendChild(noCityFoundMessage);
    }
  } catch(error) {
    const p = document.getElementById("p");
    const errorMessage = document.createTextNode("Error; try again please.");
    clear(p);
    p.appendChild(errorMessage);
  }
};
const btn = document.getElementById("btn");
btn.addEventListener("click", fetchAndRenderCityData);

async function fetchCityData(city) {
  const response = await fetch("http://dataservice.accuweather.com/locations/v1/cities/search?apikey=SlhOykseiy5qmrZym7dGGVNRtiGU4Vh0&q=" + city, {mode: 'cors'})
  const allCityData = await response.json();
  let allKeysAreasCountries = [];
  allCityData.forEach((object) => {
    allKeysAreasCountries.push([object.Key, object.AdministrativeArea.EnglishName, object.Country.EnglishName]);
  });
  return allKeysAreasCountries;
};

const renderCityData = (city, cityData) => {
  console.log(cityData);
  const p = document.getElementById("p");
  clear(p);
  const searchResults = document.getElementById("search-results");
  clear(searchResults);
  const weatherResults = document.getElementById("weather-results");
  clear(weatherResults);
  cityData.forEach((array) => {
    const btn = document.createElement("button");
    btn.textContent = "Select";
    btn.onclick = () => {
      console.log(array[0]);
      fetchAndRenderWeatherData(array[0]);
    };
    searchResults.appendChild(btn);
    const cityAreaCountry = document.createTextNode(capitalizeFirstLetters(city) + ", " + array[1] + ", " + array[2]);
    searchResults.appendChild(cityAreaCountry);
    linebreak = document.createElement("br");
    searchResults.appendChild(linebreak);
  });
};

async function fetchAndRenderWeatherData(locationKey) {
  try {
    const weatherData = await fetchWeatherData(locationKey);
    renderWeatherData(weatherData);
  } catch(error) {
    const p = document.getElementById("p");
    const errorMessage = document.createTextNode("Error; try again please.");
    clear(p);
    p.appendChild(errorMessage);
  }
};

async function fetchWeatherData(locationKey) {
  const response = await fetch("http://dataservice.accuweather.com/currentconditions/v1/" + locationKey + "?apikey=SlhOykseiy5qmrZym7dGGVNRtiGU4Vh0&details=true", {mode: 'cors'})
  const allWeatherData = await response.json();
  const selectedWeatherData = {
    summary: allWeatherData[0].WeatherText,
    tempInF: allWeatherData[0].Temperature.Imperial.Value,
    tempInC: allWeatherData[0].Temperature.Metric.Value,
    humidity: allWeatherData[0].RelativeHumidity,
    hasPrecipitation: allWeatherData[0].HasPrecipitation,
    isDayTime: allWeatherData[0].IsDayTime,
    icon: allWeatherData[0].WeatherIcon
  }
  return selectedWeatherData;
}

const renderWeatherData = (weatherData) => {
  const p = document.getElementById("p");
  clear(p);
  const searchResults = document.getElementById("search-results");
  clear(searchResults);
  const weatherResults = document.getElementById("weather-results");
  clear(weatherResults);
  const summary = document.createTextNode("Summary: " + weatherData.summary);
  weatherResults.appendChild(summary);
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
