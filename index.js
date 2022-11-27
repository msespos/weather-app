    async function fetchWeather() {
      try {
        const city = "Lomita";
        const response = await fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=2fa07d454345910bbe52c05e16f97674",
              {mode: 'cors'}
             )
        const allWeatherData = await response.json();
        const weatherData = {
          name: allWeatherData.name,
          description: allWeatherData.weather[0].description
        }
        console.log("allWeatherData:", allWeatherData);
        console.log("weatherData", weatherData);
      } catch(error) {
        console.log("Error; try again please.")
      }
    }
    fetchWeather();
