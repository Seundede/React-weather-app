import "./App.css";
import { useState } from "react";
const api = {
  key: process.env.REACT_APP_API_KEY,
  base: "https://api.openweathermap.org/data/2.5/",
  
};

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState("");

  const search = (e) => {
    if (e.key === "Enter") {
      fetch(`${api.base}weather?q=${city}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
          setWeather(result);
          setCity("");
        });
    }
  };

  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };
  return (
    <div className="app">
      <main>
        <div className="search">
          <input
            type="text"
            className="search__input"
            placeholder="Enter location"
            onChange={(e) => setCity(e.target.value)}
            value={city}
            onKeyPress={search}
          />
        </div>
        {typeof weather.main != "undefined" ? (
          <div>
            <div className="location--box">
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>
              <div className="date">{dateBuilder(new Date())} </div>
            </div>
            <div className="weather--box">
              <div className="temp">{Math.round(weather.main.temp)}&deg;c</div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
          </div>
        ) : (
          <div>
            <div className="location--box">
              <div className="location">Abuja, Nigeria</div>
              <div className="date">{dateBuilder(new Date())} </div>
            </div>
            <div className="weather--box">
              <div className="temp">20&deg;c</div>
              <div className="weather">Sunny</div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
