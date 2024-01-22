
# Weather App

## This Weather App is built Using Reactjs . It aims to display users with accurate and insightful weather information for the next 3 days. It utilizes Open Weather API to get accurate weather prediction for any city, processes it, and presents the forecast along with additional conditions like rain, high winds, and thunderstorms.

**Local Setup**

npm install

npm run test

npm start

## Flow Chart of Application

![Alt text](flowchart.drawio.png)

## Code Coverage

![Alt text](<weather app coverage.png>)

##React Components

**Search Component**

Handle Api Call Response

**Weather Card**

Display detail weather forecast for selected time

**Weather Forecast Card**

Display  weather forecast for nearby duration

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

## Deployment

This Repo Contain Jenkins Script which run build, test, create docker image, push to docker hub and deploy on minikube kubernetes cluster




