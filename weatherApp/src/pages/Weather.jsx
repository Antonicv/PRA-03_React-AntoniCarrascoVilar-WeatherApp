// Este componente muestra el clima actual y el pronóstico de una ciudad
// usando la API de OpenWeatherMap.

// Importa los hooks necesarios

import { useState, useEffect } from "react";
import axios from "axios";
import { useTranslation } from 'react-i18next'; // Importa el hook de traducción

// Define un estilo para los contenedores
const containerStyle = {
  width: "100%",
  margin: "50px auto", // Adds 50px margin to the top and centers horizontally
  padding: "20px",
  border: "1px solid #ccc",
  borderRadius: "8px",
  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  backgroundColor: "#f9f9f9",
  color: "#333",
};
// Define el componente Weather
export default function Weather() {
  const { t } = useTranslation(['common', 'weather']); // Usa los namespaces 'common' y 'weather'
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  // Define una función para obtener los datos del clima
  const fetchWeatherData = async () => {
    if (!city) return;
    setLoading(true);
    setError("");
    try {
      // Usa la variable de entorno para la API key
      const apiKey = import.meta.env.VITE_OPEN_WEATHER_API_KEY;
      // Realiza dos peticiones a la API de OpenWeatherMap
      const currentWeatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      setWeather(currentWeatherResponse.data);
      // Filtra los datos para obtener solo un pronóstico diario
      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
      );
      setForecast(forecastResponse.data.list.filter((_, index) => index % 8 === 0));
    } catch (err) {
      setError(t('weather:error')); // Usa la traducción para el mensaje de error
    } finally {
      setLoading(false);
    }
  };
  // Usa el hook useEffect para cargar los datos por defecto
  useEffect(() => {
    fetchWeatherData();
  }, []); // Fetch default data on load if needed

  return (
    <div>
      <h1>{t('weather:title')}</h1> {/* Título traducido */}
      <div>
        <input
          type="text"
          placeholder={t('weather:search_placeholder')} // Placeholder traducido
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />{" "}
        <button onClick={fetchWeatherData}>{t('weather:search_button')}</button> {/* Botón traducido */}
      </div>
      {loading && <p>{t('weather:loading')}</p>} {/* Mensaje de carga traducido */}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {weather && (
        <div style={containerStyle}>
          <h2>{t('weather:current_weather', { city: weather.name })}</h2> {/* Ciudad dinámica */}
          <p>
            {t('weather:temperature')}:{" "}
            <span style={{ fontWeight: "bold", fontSize: "1.2em" }}>
              {weather.main.temp}
            </span>
            °C
          </p>
          <p>{t('weather:condition')}: {weather.weather[0].description}</p>
        </div>
      )}
      {forecast.length > 0 && (
        <div style={containerStyle}>
          <h2>{t('weather:forecast')}</h2> {/* Pronóstico traducido */}
          {forecast.map((day, index) => (
            <div key={index}>
              <p>{t('weather:date')}: {new Date(day.dt_txt).toLocaleDateString()}</p>
              <p>
                {t('weather:temp')}: <b>{day.main.temp}</b> °C
              </p>
              <p>{t('weather:condition')}: {day.weather[0].description}</p>
              <br />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}