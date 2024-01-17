import { useState } from "react";
import "./App.css";
import { SearchComponent } from "./components/search/SearchComponent";

import { TemperatureCard } from "./components/temperature/TemperatureCard";
import { SummaryCard } from "./components/summary/SummaryCard";

import { v4 as uuidv4 } from "uuid";

function App() {
  const [weatherStats, setWeatherStats] = useState([]);
  const [dateSelected, setDateSelected] = useState(0);

  const handleCitySubmit = (stats) => {
    setWeatherStats(stats);
  };

  const handleInvalidCity = () => {
    setDateSelected(0);
    setWeatherStats([]);
  };

  return (
    <div className="App">
      <SearchComponent
        onSubmitCity={handleCitySubmit}
        handleInvalidCity={handleInvalidCity}
      />
      <div>
        {weatherStats && weatherStats.length > 0 && (
          <div className="horizontal-list">
            {weatherStats.map((stat, index) => (
              <TemperatureCard
                key={uuidv4()}
                weatherStat={stat}
                onClick={() => setDateSelected(index)}
                selected={index === dateSelected}
              />
            ))}
          </div>
        )}
        {weatherStats && weatherStats.length > 0 && (
          <SummaryCard weatherStat={weatherStats[dateSelected]} />
        )}
      </div>
    </div>
  );
}

export default App;
