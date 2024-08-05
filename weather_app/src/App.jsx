import React, { useState } from 'react'
import './App.css'

const api = {
  key: " // insert key here //",
  base: "https://api.openweathermap.org/data/2.5/"
}
function App() {

  const [query, setQuery] = useState('');
  const[weather, setWeather] = useState({});

  const search = evt => {
    if (evt.key === 'Enter'){
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
          });
    }
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    const getDateSuffix = (date) => {
      let suffix;
      if (date === 1 || date === 21 || date === 31) {
        suffix = "st";
      } else if (date === 2 || date === 22) {
        suffix = "nd";
      } else if (date === 3 || date === 23) {
        suffix = "rd";
      } else {
        suffix = "th";
      }
      return suffix;
      }
    return `${day}, ${month} ${date}${getDateSuffix(date)} ${year}`
  }

  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'app warm' : 'app') : 'app'}> 
      <main>
        <div className="search-box">
          <input 
            type='text'
            className='search-bar'
            placeholder='Search...'
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
            />
        </div>
        {(typeof weather.main != "undefined") ? (
          <div>
            <div className="location-box">
              <div className="location">{weather.name}, {weather.sys.country}</div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">{Math.round(weather.main.temp)}°C</div>
              <div className="humidity">{weather.main.humidity}% Humidity</div>
              <div className="pressure">{weather.main.pressure} hPa </div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
          </div>
        ) : ('')}
      </main>
    </div>
  )
}

export default App
