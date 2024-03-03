import { useState, useEffect } from 'react'
import React from 'react'
import './App.css'

export default function App() {
    const [selectedCity, setSelectedCity] = useState('New York')
    const [weatherInfo, setWeatherInfo] = useState ([])

    const handleCityChange = (event) => {
      setSelectedCity(event.target.value)
    }

    const cities = [
      { name: 'New York', country: 'US', lat:40.7128 , lon: 74.0060 },
      { name: 'London', country: 'GB', lat: 51.5072, lon: 0.1276 },
      { name: 'Tokyo', country: 'JP', lat: 35.6764, lon: 139.65 },
      { name: 'Paris', country: 'FR', lat: 48.8566, lon: 2.3522 },
      { name: 'Sydney', country: 'AU', lat: 33.8688, lon: 151.2093 },
      { name: 'Berlin', country: 'DE', lat: 52.52, lon: 13.4050 },
      { name: 'Moscow', country: 'RU', lat: 55.7558, lon: 37.6173 },
      { name: 'Toronto', country: 'CA', lat: 43.6532, lon: 79.3832 },
      { name: 'Beijing', country: 'CN', lat: 39.9042, lon: 116.4074 },
      { name: 'Rio de Janeiro', country: 'BR', lat: 22.9068, lon: 43.1729 }
    ]

  useEffect(() => {

      const fetchWeather = async () => {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${selectedCity}&appid=${import.meta.env.VITE_WEATHER_MAP_API}&units=imperial`)
        const data = await response.json()
        console.log(data);
        setWeatherInfo({
          temperature: data.main.temp,
          clouds: data.clouds.all,
          windSpeed: data.wind.speed,
        })
    }
    fetchWeather()
  }, [selectedCity])

  function WeatherCard({ weatherInfo }) {
    return (
      <div className="weather-card">
        <h2>Current Weather</h2>
        <p>Temperature: {weatherInfo.temperature}°F</p>
        <p>Cloud Coverage: {weatherInfo.clouds}%</p>
        <p>Wind Speed: {weatherInfo.windSpeed} mph</p>
      </div>
    );
  }

  return (
    <>
      <div className='app'>
        <div className='search'>
          <select onChange={handleCityChange}>
            {cities.map((city, index) => (
              <option key={index} value={city.name}>{city.name}</option>))}
          </select>
        </div>
      </div>
      <WeatherCard weatherInfo={weatherInfo} />
    </>
  )
}

