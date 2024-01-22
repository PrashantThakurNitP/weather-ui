import React from "react";
import PropTypes from "prop-types";
import "./WeatherForecastCard.css";

export const WeatherForecastCard = ({ weather, onClickCard }) => {
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
    <div
      data-testid="forecast-card"
      className="weather-card"
      onClick={handleCardClick}
    >
      <h2 data-testid="forecast-card-description">{description}</h2>
      <img
        data-testid="forecast-card-img"
        src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
        alt={description}
      />
      <p>{`Date: ${date}, Time: ${timeString12hr}`}</p>
      <p data-testid="forecast-card-temperature">
        {`Temperature: ${temperature}°C`}
        <br />
        Min: {Math.round(minTemperature)}°C / Max: {Math.round(maxTemperature)}
        °C
      </p>

      <p data-testid="forecast-card-wind">{`Wind Speed: ${windSpeed} m/s`}</p>
      <p data-testid="forecast-card-message">{message}</p>
    </div>
  );
};
WeatherForecastCard.propTypes = {
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
  }).isRequired,
  onClickCard: PropTypes.func,
};
