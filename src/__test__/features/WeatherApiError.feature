Feature: Weather Service API call
  getting weather forecast for a city
 
  Scenario Outline: Give Error for weather api call
    Given the city is <city>
    When User clicks on Submit
    Then the Error should be returned <error>
  
    Examples:
      | city      | error                                                                                                                                                                         |
      | "London"  | {"error": "NOT FOUND"}|
