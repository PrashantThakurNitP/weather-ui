import React, { useState } from "react";
import PropTypes from "prop-types";
import "./SearchComponent.css";
import { getWeatherReport } from "../../service/getWeatherReport";

export const SearchComponent = ({ onSubmitCity, handleInvalidCity }) => {
  const [cityName, setCityName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (event) => {
    setCityName(event.target.value);
  };

  const handleClick = async () => {
    try {
      if (cityName === "") {
        setErrorMessage("Please enter a city name.");
        handleInvalidCity();
      } else {
        console.log(cityName);
        const report = await getWeatherReport(cityName);
        console.log("report", report);
        setErrorMessage("");
        onSubmitCity(report.data);
      }
    } catch (err) {
      setErrorMessage(err.message + ". Please enter a valid city name.");
      handleInvalidCity();
    }
  };

  return (
    <div className="search-component">
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter city name"
          value={cityName}
          onChange={handleInputChange}
          className="input-field"
        />
        <button onClick={handleClick} className="submit-button">
          Submit
        </button>
      </div>
      <p className="error-message">{errorMessage}</p>
    </div>
  );
};

SearchComponent.propTypes = {
  onSubmitCity: PropTypes.func.isRequired,
  handleInvalidCity: PropTypes.func.isRequired,
};
