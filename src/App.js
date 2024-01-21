import React, { useState } from "react";
import "./App.css";
import { SearchComponent } from "./components/search/SearchComponent";
import { TemperatureCard } from "./components/temperature/TemperatureCard";
import { v4 as uuidv4 } from "uuid";
import { TemperatureForecastCard } from "./components/temperature/TemperatureForecastCard";

function App() {
  const [weatherStats, setWeatherStats] = useState([]);
  const [currentWeather, setCurrentWeather] = useState();

  const handleCitySubmit = (stats) => {
    setWeatherStats(stats);
    setCurrentWeather(filterRecords(stats));
  };
  const handleInvalidCity = () => {
    setWeatherStats([]);
  };
  function filterRecords(records) {
    const currentUnixTime = new Date().getTime() / 1000;

    const filteredRecords = records.find((record) => {
      const recordTime =
        new Date(
          `${record.dailyWeathers.date}T${record.dailyWeathers.time}`
        ).getTime() / 1000;
      return Math.abs(recordTime - currentUnixTime) < 5400; // Assuming a tolerance of 30 minutes (1800 seconds)
    });

    return filteredRecords;
  }
  const onClickCard = (weather) => {
    setCurrentWeather(weather);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Weather App</h1>
      </header>
      <main className="app-main">
        <SearchComponent
          onSubmitCity={handleCitySubmit}
          handleInvalidCity={handleInvalidCity}
        />

        <div className="content-wrapper">
          {weatherStats && weatherStats.length > 0 && (
            <div className="horizontal-list">
              <TemperatureCard key={uuidv4()} weather={currentWeather} />
            </div>
          )}
          {weatherStats && weatherStats.length > 0 && (
            <div className="horizontal-list">
              {weatherStats.map((weather) => (
                <TemperatureForecastCard
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
