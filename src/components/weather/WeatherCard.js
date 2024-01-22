import React from "react";
import PropTypes from "prop-types";
import "./WeatherCard.css";

export const WeatherCard = ({ weather }) => {
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
      feelsLike,
      humidity,
      pressure,
      visibility,
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

  return (
    <div data-testid="weather-card" className="weather-card">
      <h2 data-testid="weather-card-description">{description}</h2>
      <img
        data-testid="weather-card-img"
        src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
        alt={description}
      />
      <p data-testid="weather-card-date">{`Date: ${date}, Time: ${timeString12hr}`}</p>
      <p data-testid="weather-card-temperature">
        {`Temperature: ${temperature}°C /Feels Like: ${feelsLike}`}
        <br />
        Min: {Math.round(minTemperature)}°C / Max: {Math.round(maxTemperature)}
        °C
      </p>
      <p data-testid="weather-card-wind">{`Wind Speed: ${windSpeed} m/s`}</p>
      <p data-testid="weather-card-humidity">{`Humidity: ${humidity}`}</p>
      <p data-testid="weather-card-visibility">{`Visibility: ${visibility}`}</p>
      <p data-testid="weather-card-pressure">{`Pressure: ${pressure}`}</p>
      <p data-testid="weather-card-message">{message}</p>
    </div>
  );
};
WeatherCard.propTypes = {
  weather: PropTypes.shape({
    message: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    dailyWeathers: PropTypes.shape({
      temperature: PropTypes.number.isRequired,
      date: PropTypes.string.isRequired,
      time: PropTypes.string.isRequired,
      windSpeed: PropTypes.number.isRequired,
      minTemperature: PropTypes.number.isRequired,
      maxTemperature: PropTypes.number.isRequired,
      feelsLike: PropTypes.number.isRequired,
      humidity: PropTypes.number.isRequired,
      pressure: PropTypes.number.isRequired,
      visibility: PropTypes.number.isRequired,
    }).isRequired,
    weatherType: PropTypes.string.isRequired,
  }).isRequired,
};
