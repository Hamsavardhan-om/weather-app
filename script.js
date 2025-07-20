document.addEventListener('DOMContentLoaded', () =>
{
  const input = document.querySelector("#city-input");
  const button = document.querySelector("#get-weather-btn");
  const weatherInfo = document.querySelector('#weather-info');
  const cityName = document.querySelector('#city-name');
  const temperature = document.querySelector('#temperature');
  const description = document.querySelector('#description');
  const windSpeed = document.querySelector('#wind');
  const errorMsg = document.querySelector('#error-message');
  const API_KEY = '3b306e2676577f9c800ad62b9127a2cf';

  button.addEventListener('click', async () =>
  {
    const city = input.value.trim();

    if(!city)
      return;

    try
    {
      const weatherData = await fetchWeather(city);
      renderWeather(weatherData);
    }

    catch(error)
    {
      showError();
    }
    

  })

  async function fetchWeather(city)
  {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

    const response = await fetch(url);

    if(!response.ok)
      throw new Error("City not found. Please try again");

    const data = await response.json();
    return data;
  }

  function renderWeather(data)
  {
    console.log(data);
    const {main, sys, name, weather, wind} = data;

    if(sys.country === undefined)
      cityName.textContent = `${name}`;
    else
      cityName.textContent = `${name}, ${sys.country}`;

    if(main.temp < 0)
      temperature.textContent = `Temperature: ${main.temp}° C ⛄`;
    else if(main.temp >= 0 && main.temp < 10)
      temperature.textContent = `Temperature: ${main.temp}° C ❄️`;
    else if(main.temp >= 10 && main.temp < 20)
      temperature.textContent = `Temperature: ${main.temp}° C ⛅`;
    else if(main.temp >= 20 && main.temp < 30)
      temperature.textContent = `Temperature: ${main.temp}° C ☀️`;
    else if(main.temp >= 30 && main.temp < 38)
      temperature.textContent = `Temperature: ${main.temp}° C 🌞`;
    else
      temperature.textContent = `Temperature: ${main.temp}° C 🌡️`;

    description.textContent = `Weather: ${weather[0].description}`;

    windSpeed.textContent = `Wind speed: ${wind.speed} 🍃`;

    weatherInfo.classList.remove('hidden');
    errorMsg.classList.add('hidden');
  }

  function showError()
  {
    weatherInfo.classList.add("hidden"); 
    errorMsg.classList.remove("hidden"); 
  }

})