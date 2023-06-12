// Get references to the necessary elements
const searchButton = document.querySelector('#search-btn');
const searchInput = document.querySelector('#floatingInput');
const currentCityElement = document.querySelector('#current-city');
const currentWeatherElement = document.querySelector('#current-weather');
const currentTemperatureElement = document.querySelector('#current-temperature');
const currentWindElement = document.querySelector('#current-wind');
const currentHumidityElement = document.querySelector('#current-humidity');
const currentDateElement = document.querySelector('#current-date'); 

const forecastContainer = document.querySelector('.forecast-container');
const forecastCards = document.querySelectorAll('.forecast-card');

// Add event listener to the search button
searchButton.addEventListener('click', () => {
    const searchTerm = searchInput.value.trim();
    if (searchTerm !== '') {
      var apiKey = 'e9ade097c11130cb50bd86df245d32ea';
      const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&appid=${apiKey}`;
      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${searchTerm}&appid=${apiKey}`;

    // Make a request to the OpenWeatherMap API using the search term.
    fetch(currentWeatherUrl)
      .then(response => response.json())
      .then(data => {
      // Get the weather, wind, and humidity from the response data
      const weather = data.weather[0].description;
      // Originally, when a city was searched, the description for the 'Weather' was all lowercase, 
      // but I wanted it to capitalize the first letter of each word so I made this variable to handle this.
      const capitalizedWeather = weather
          // This will split each word in the description for the 'Weather'.
          .split(' ')
          // Now that the words are split, I am targeting the first letter of each word('charAt(0)' being the index for the letter) and making it uppercase.
          // The slice is used to return the rest of the word starting at the second letter('slice(1)' being the index for the second letter and so forth).
          // This allows only the first letter to be capitalized and not every letter of the word with the help of slice.
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          // Lastly, I join these words back together so that they can be displayed('currentWeatherElement.textContent = `Weather: ${capitalizedWeather}`;').
          // The reason there is only a space('join(' ')') is because a comma is the default for the separator when using 'join' and I do not desire that output.
          .join(' ');
      // This is the variable for the temperature of the city that is searched.  
      const temperatureKelvin = data.main.temp;
      // This is using a formula to convert the initial temperature(Kelvin) to Fahrenheit.
      const temperatureFahrenheit = (temperatureKelvin - 273.15) * 9 / 5 + 32;
      // This is the default for 'Wind Speed(meters/second)' after retrieving the data.
      const windMeterSec = data.wind.speed;
      // I wanted the 'Wind Speed' to be in MPH so I looked up the conversion formula and implemented it into a new variable to display.
      const windMileHour = windMeterSec * 2.23694; 
      // This is the variable for the humidity of the city that is searched.
      const humidity = data.main.humidity;

      // Update the corresponding elements with the weather information
      currentCityElement.textContent = `Current City: ${searchTerm}`;
      currentWeatherElement.textContent = `Weather: ${capitalizedWeather}`;
      currentTemperatureElement.textContent = `Temperature: ${temperatureFahrenheit.toFixed(1)}°F`;
      currentWindElement.textContent = `Wind Speed: ${windMileHour.toFixed(1)} MPH`;
      currentHumidityElement.textContent = `Humidity: ${humidity}%`;

      // Update the current date element
      const options = { weekday: 'long', month: 'long', day: 'numeric' };
      const formattedDate = new Date().toLocaleDateString('en-US', options);
      currentDateElement.textContent = formattedDate;
    })
      .catch(error => {
          console.log('Error:', error);
      });

        // Make a request to get the 5-day forecast
    fetch(forecastUrl)
      .then(response => response.json())
      .then(data => {
        const forecastList = data.list;
        const fiveDayForecast = forecastList.slice(0, 5);

        fiveDayForecast.forEach((forecast, index) => {
          const currentDate = new Date();
          currentDate.setDate(currentDate.getDate() + index + 1);
          const options = { weekday: 'long', month: 'long', day: 'numeric' };
          const formattedDate = currentDate.toLocaleDateString('en-US', options);
          const day = currentDate.toLocaleDateString('en-US', { weekday: 'long' });
          const weather = forecast.weather[0].description;
          const capitalizedWeather = weather
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
          const temperatureKelvin = forecast.main.temp;
          const temperatureFahrenheit = (temperatureKelvin - 273.15) * 9 / 5 + 32;

          forecastCards[index].querySelector('.forecast-day').textContent = `${formattedDate}`;
          forecastCards[index].querySelector('.forecast-weather').textContent = capitalizedWeather;
          forecastCards[index].querySelector('.forecast-temperature').textContent = `${temperatureFahrenheit.toFixed(1)}°F`;
        });

        if (fiveDayForecast.length > 0) {
          forecastContainer.style.display = 'block';
        } else {
          forecastContainer.style.display = 'none';
        }
      })
      .catch(error => {
        console.log('Error:', error);
      });
    }
});

// Add event listener to the search input for autocomplete
$(searchInput).autocomplete({
    source: function (request, response) {
      const searchTerm = request.term.trim();
      if (searchTerm !== '') {
        var apiKey = 'e9ade097c11130cb50bd86df245d32ea';
        var apiUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${searchTerm},us&limit=10&appid=${apiKey}`;

        // Make a request to the OpenWeatherMap API using the search term
        fetch(apiUrl)
          .then(response => response.json())
          .then(data => {
            const cities = data.map(city => `${city.name}, ${city.state}, US`);
            response(cities);
          })
          .catch(error => {
            console.log('Error:', error);
            response([]);
          });
      } else {
        response([]);
      }
    },
    minLength: 2,
    select: function (event, ui) {
      searchInput.value = ui.item.value;
      searchButton.click();
    }
});