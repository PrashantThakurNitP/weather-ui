import React from "react";
import PropTypes from "prop-types";
import "./TemperatureCard.css";

export const TemperatureCard = ({ weatherStat, onClick, selected }) => {
  return (
    <div
      className={`temperature-card${selected ? " selected-card" : ""}`}
      onClick={onClick}
      onKeyDown={() => {}}
      data-testid="temp-card-testid"
    >
      <p>
        {weatherStat.dailyWeathers.day} {weatherStat.date}
      </p>
      <div>
        <div>
          <img
            src={`https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/SunnyDayV3.svg`}
            title={`${weatherStat.alt}`}
            alt={`${weatherStat.alt}`}
          ></img>
        </div>
        <div>
          <div>
            <div>{weatherStat.dailyWeathers.maxTemperature}°</div>
          </div>
          <div>
            <div>{weatherStat.dailyWeathers.minTemperature}°</div>
          </div>
        </div>
      </div>
    </div>
  );
};

TemperatureCard.propTypes = {
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
