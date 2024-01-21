import React from "react";
import PropTypes from "prop-types";
import "./TemperatureForecastCard.css";

export const TemperatureForecastCard = ({ weather, onClickCard }) => {
  const {
    message,
    icon,
    description,
    dailyWeathers: {
      temperature,
      date,
      time,
      windSpeed,
      minTemperature,
      maxTemperature,
    },
    weatherType,
  } = weather;
  const timeString12hr = new Date(
    "1970-01-01T" + time + "Z"
  ).toLocaleTimeString("en-US", {
    timeZone: "UTC",
    hour12: true,
    hour: "numeric",
    minute: "numeric",
  });
  const handleCardClick = () => {
    onClickCard(weather);
  };
  return (
    <div className="weather-card" onClick={handleCardClick}>
      <h2>{description}</h2>
      <img
        src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
        alt={description}
      />
      <p>{`Date: ${date}, Time: ${timeString12hr}`}</p>
      <p>
        {`Temperature: ${temperature}°C`}
        <br />
        Min: {Math.round(minTemperature)}°C / Max: {Math.round(maxTemperature)}
        °C
      </p>

      <p>{`Wind Speed: ${windSpeed} m/s`}</p>
    </div>
  );
};

TemperatureForecastCard.propTypes = {
  onClick: PropTypes.func.isRequired,
  selected: PropTypes.bool,
  weatherStat: PropTypes.shape({
    day: PropTypes.string,
    date: PropTypes.number,
    minTemp: PropTypes.number,
    maxTemp: PropTypes.number,
    type: PropTypes.string,
    alt: PropTypes.string,
  }).isRequired,
};
