# Weather App

This Weather App provides real-time weather information and forecasts for any city. It also includes an interactive map to explore different locations. The app is built using React, Material-UI, and various other libraries.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup and Installation](#setup-and-installation)
- [How It Works](#how-it-works)
- [Hooks Explained](#hooks-explained)
- [Libraries Used](#libraries-used)

## Features

- Real-time weather information
- 5-day weather forecast
- Interactive map to explore locations
- Multilingual support (English, Spanish, Catalan)
- Light and dark theme modes

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **Material-UI**: A popular React UI framework.
- **Axios**: A promise-based HTTP client for making API requests.
- **React-Leaflet**: A React wrapper for Leaflet, a JavaScript library for interactive maps.
- **i18next**: An internationalization framework for JavaScript.
- **Day.js**: A lightweight JavaScript date library.
- **React Router**: A library for routing in React applications.

## Setup and Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/weather-app.git
   cd weather-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your OpenWeatherMap API key:
   ```env
   VITE_OPEN_WEATHER_API_KEY=your_api_key_here
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## How It Works

### Weather Component

The `Weather` component fetches and displays the current weather and 5-day forecast for a specified city. It uses the OpenWeatherMap API to get the weather data.

### Map Component

The `MapView` component displays an interactive map using React-Leaflet. Users can search for cities, and the map will center on the searched location.

### Theme Context

The `ThemeContext` provides light and dark theme modes. Users can toggle between themes, and the preference is saved in `localStorage`.

## Hooks Explained

### useState

The `useState` hook is used to manage state in functional components. It returns an array with two elements: the current state value and a function to update it.

Example:
```jsx
const [city, setCity] = useState("");
```

In the `Weather` component, `useState` is used to manage the state for the city, weather data, forecast data, loading state, error messages, and the selected tab index.

### useEffect

The `useEffect` hook allows you to perform side effects in functional components. It takes a function and an optional array of dependencies. The function runs after the component renders and whenever the dependencies change.

Example:
```jsx
useEffect(() => {
  fetchWeatherData();
}, []); // Runs only once after the initial render
```

In the `Weather` component, `useEffect` is used to fetch weather data when the component mounts.

### useContext

The `useContext` hook is used to access the context value in functional components. It takes a context object and returns the current context value.

Example:
```jsx
const { theme, isDarkMode, toggleTheme } = useContext(ThemeContext);
```

In the `Layout` component, `useContext` is used to access the theme context and apply the selected theme to the application.

### useTranslation

The `useTranslation` hook is used to access translation functions and the current language in functional components.

Example:
```jsx
const { t } = useTranslation(['common', 'weather']);
```

In the `Weather` component, `useTranslation` is used to get the translation function `t` for translating text based on the current language.

### useMap

The `useMap` hook is used to access the Leaflet map instance in functional components.

Example:
```jsx
const map = useMap();
```

In the `MapUpdater` component, `useMap` is used to get the map instance and update its center when the coordinates change.

## Libraries Used

- **React**: For building the user interface.
- **Material-UI**: For styling and UI components.
- **Axios**: For making HTTP requests to the OpenWeatherMap API.
- **React-Leaflet**: For integrating Leaflet maps into the React application.
- **i18next**: For internationalization and multilingual support.
- **Day.js**: For date manipulation and formatting.
- **React Router**: For handling routing in the application.

