import React from "react";
import PropTypes from "prop-types";
import "./SummaryCard.css";

export const SummaryCard = ({ weatherStat }) => {
  return (
    <>
      {weatherStat.message ||
        (weatherStat.dailyWeathers && (
          <div className="summary-card">
            {weatherStat.prediction && (
              <>
                <h1>Important Predictions</h1>
                <div
                  dangerouslySetInnerHTML={{
                    __html: weatherStat.dailyWeathers,
                  }}
                />
              </>
            )}
            <hr></hr>
            {weatherStat.warning && (
              <>
                <h1>Warnings</h1>
                <div
                  dangerouslySetInnerHTML={{ __html: weatherStat.message }}
                />
              </>
            )}
          </div>
        ))}
    </>
  );
};

SummaryCard.propTypes = {
  weatherStat: PropTypes.shape({
    prediction: PropTypes.string,
    warning: PropTypes.string,
  }).isRequired,
};
