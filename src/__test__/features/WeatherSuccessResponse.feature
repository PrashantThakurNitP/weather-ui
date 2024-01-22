Feature: Weather Service API call
  getting weather forecast for a city
 
  Scenario Outline: Show weather report
    Given the city is <city>
    When User clicks on Submit
    Then the weather report should contain <response>
  
    Examples:
      | city      | response                                                                                                                                                                         |
      | "London"  | {"message": "Cold Outside","icon": "01n","description": "clear sky"}|
