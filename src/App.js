import React, { useState } from "react";
import "./App.css";
import { SearchComponent } from "./components/search/SearchComponent";
import { WeatherCard } from "./components/weather/WeatherCard";
import { v4 as uuidv4 } from "uuid";
import { WeatherForecastCard } from "./components/weather/WeatherForecastCard";
import { getSelectedRecord } from "./service/getSelectedRecord";

function App() {
  const [weatherStats, setWeatherStats] = useState([]);
  const [currentWeather, setCurrentWeather] = useState();
  const handleCitySubmit = (stats) => {
    setWeatherStats(stats);
    setCurrentWeather(getSelectedRecord(stats));
  };
  const handleInvalidCity = () => {
    setWeatherStats([]);
  };

  const onClickCard = (weather) => {
    setCurrentWeather(weather);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 data-testid="headline-app-name">Weather App</h1>
      </header>
      <main className="app-main">
        <SearchComponent
          onSubmitCity={handleCitySubmit}
          handleInvalidCity={handleInvalidCity}
        />

        <div className="content-wrapper">
          {weatherStats && weatherStats.length > 0 && (
            <div className="horizontal-list">
              <WeatherCard key={uuidv4()} weather={currentWeather} />
            </div>
          )}
          {weatherStats && weatherStats.length > 0 && (
            <div className="horizontal-list">
              {weatherStats.map((weather) => (
                <WeatherForecastCard
                  key={uuidv4()}
                  weather={weather}
                  onClickCard={onClickCard}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
