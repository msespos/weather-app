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
  cityData.forEach((array) => {
    const cityAreaCountry = document.createTextNode(capitalizeFirstLetters(city) + ", " + array[1] + ", " + array[2]);
    searchResults.appendChild(cityAreaCountry);
    linebreak = document.createElement("br");
    searchResults.appendChild(linebreak);
  });
};

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
