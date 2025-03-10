// Aquest component mostra el clima actual i el pronòstic d'una ciutat
// utilitzant l'API d'OpenWeatherMap.

// Importa els hooks necessaris
import { useState, useEffect } from "react";
import axios from "axios";
import { useTranslation } from 'react-i18next'; // Importa el hook de traducció
import { TextField, Button, Tabs, Tab, Box } from '@mui/material';
import {
  Opacity,
  Compress,
  Visibility,
  Cloud,
  Air,
  Grain,
  AcUnit,
  Brightness5,
  Brightness3,
} from '@mui/icons-material';// Importa els ícones de Material-UI
import '../weather.css'; // Importa l'estil del component

// Defineix el component Weather
export default function Weather() {
  const { t } = useTranslation(['common', 'weather']); // Utilitza els namespaces 'common' i 'weather'
  const [city, setCity] = useState(""); // Estat per a la ciutat
  const [weather, setWeather] = useState(null); // Estat per al clima actual
  const [forecast, setForecast] = useState([]); // Estat per al pronòstic
  const [loading, setLoading] = useState(false); // Estat per a la càrrega
  const [error, setError] = useState(""); // Estat per als errors
  const [tabIndex, setTabIndex] = useState(0); // Estat per a la pestanya seleccionada

  // Defineix una funció per obtenir les dades del clima
  const fetchWeatherData = async () => {
    if (!city) return;
    setLoading(true);
    setError("");
    try {
      // Utilitza la variable d'entorn per a la clau de l'API
      const apiKey = import.meta.env.VITE_OPEN_WEATHER_API_KEY;
      // Realitza dues peticions a l'API d'OpenWeatherMap
      const currentWeatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      setWeather(currentWeatherResponse.data);
      // Filtra les dades per obtenir només un pronòstic diari
      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
      );
      setForecast(forecastResponse.data.list.filter((_, index) => index % 8 === 0));
    } catch (err) {
      setError(t('weather:error')); // Utilitza la traducció per al missatge d'error
    } finally {
      setLoading(false);
    }
  };

  // Utilitza el hook useEffect per carregar les dades per defecte
  useEffect(() => {
    fetchWeatherData();
  }, []); // Carrega les dades per defecte en carregar el component

  // Funció per gestionar la tecla Enter
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      fetchWeatherData();
    }
  };

  // Funció per gestionar el canvi de pestanya
  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  // Renderitza el component
  return (
    <div>
      <h1 className="centerStyle">{t('weather:title')}</h1> {/* Títol traduït */}
      <div className="centerStyle">
        <TextField
          type="text"
          placeholder={t('weather:search_placeholder')} // Placeholder traduït
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyPress={handleKeyPress}
          variant="outlined"
          sx={{ marginBottom: 2 }}
        />
        <Button variant="contained" onClick={fetchWeatherData} sx={{ marginLeft: 1 }}>
          {t('weather:search_button')}
        </Button>
      </div>
      {loading && <p>{t('weather:loading')}</p>} {/* Missatge de càrrega traduït */}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {weather && (
        <div className="containerStyle">
          <h2>{t('weather:current_weather', { city: weather.name })}</h2> {/* Ciutat dinàmica */}
          <p>
            {t('weather:temperature')}:{" "}
            <span style={{ fontWeight: "bold", fontSize: "1.2em" }}>
              {weather.main.temp}
            </span>
            °C
          </p>
          <p>{t('weather:condition')}: {weather.weather[0].description}</p>
          <Tabs value={tabIndex} onChange={handleTabChange} centered>
            <Tab label={t('weather:atmospheric_conditions')} />
            <Tab label={t('weather:wind_data')} />
            <Tab label={t('weather:precipitation')} />
            <Tab label={t('weather:astronomical_data')} />
          </Tabs>
          <Box className="forecastContainerStyle">
            {tabIndex === 0 && (
              <>
                <p><Opacity /> {t('weather:humidity')}: {weather.main.humidity}%</p>
                <p><Compress /> {t('weather:pressure')}: {weather.main.pressure} hPa</p>
                <p><Visibility /> {t('weather:visibility')}: {weather.visibility} m</p>
                <p><Cloud /> {t('weather:cloud_cover')}: {weather.clouds.all}%</p>
              </>
            )}
            {tabIndex === 1 && (
              <>
                <p><Air /> {t('weather:wind_speed')}: {weather.wind.speed} m/s</p>
                <p><Air /> {t('weather:wind_direction')}: {weather.wind.deg}°</p>
                <p><Air /> {t('weather:wind_gusts')}: {weather.wind.gust} m/s</p>
              </>
            )}
            {tabIndex === 2 && (
              <>
                <p><Grain /> {t('weather:rain')}: {weather.rain ? weather.rain['1h'] : 0} mm</p>
                <p><AcUnit /> {t('weather:snow')}: {weather.snow ? weather.snow['1h'] : 0} mm</p>
                <p><Grain /> {t('weather:pop')}: {weather.pop * 100}%</p>
              </>
            )}
            {tabIndex === 3 && (
              <>
                <p><Brightness5 /> {t('weather:sunrise')}: {weather.sys.sunrise ? new Date(weather.sys.sunrise * 1000).toLocaleTimeString() : 'N/A'}</p>
                <p><Brightness3 /> {t('weather:sunset')}: {weather.sys.sunset ? new Date(weather.sys.sunset * 1000).toLocaleTimeString() : 'N/A'}</p>
                <p><Brightness5 /> {t('weather:moonrise')}: {weather.sys.moonrise ? new Date(weather.sys.moonrise * 1000).toLocaleTimeString() : 'N/A'}</p>
                <p><Brightness3 /> {t('weather:moonset')}: {weather.sys.moonset ? new Date(weather.sys.moonset * 1000).toLocaleTimeString() : 'N/A'}</p>
              </>
            )}
          </Box>
        </div>
      )}
      {forecast.length > 0 && (
        <div className="containerStyle">
          <h2>{t('weather:forecast')}</h2>
          <Tabs value={tabIndex} onChange={handleTabChange} centered>
            <Tab label={t('weather:atmospheric_conditions')} />
            <Tab label={t('weather:wind_data')} />
            <Tab label={t('weather:precipitation')} />
            <Tab label={t('weather:astronomical_data')} />
          </Tabs>
          <Box className="forecastContainerStyle">
            {forecast.map((day, index) => (
              <div key={index} className="forecastBoxStyle">
                <p>{t('weather:date')}: {new Date(day.dt_txt).toLocaleDateString()}</p>
                <p>{t('weather:temperature')}: <b>{day.main.temp}</b> °C</p>
                <p>{t('weather:condition')}: {day.weather[0].description}</p>
                {tabIndex === 0 && (
                  <>
                    <p><Opacity /> {t('weather:humidity')}: {day.main.humidity}%</p>
                    <p><Compress /> {t('weather:pressure')}: {day.main.pressure} hPa</p>
                    <p><Visibility /> {t('weather:visibility')}: {day.visibility} m</p>
                    <p><Cloud /> {t('weather:cloud_cover')}: {day.clouds.all}%</p>
                  </>
                )}
                {tabIndex === 1 && (
                  <>
                    <p><Air /> {t('weather:wind_speed')}: {day.wind.speed} m/s</p>
                    <p><Air /> {t('weather:wind_direction')}: {day.wind.deg}°</p>
                    <p><Air /> {t('weather:wind_gusts')}: {day.wind.gust} m/s</p>
                  </>
                )}
                {tabIndex === 2 && (
                  <>
                    <p><Grain /> {t('weather:rain')}: {day.rain ? day.rain['3h'] : 0} mm</p>
                    <p><AcUnit /> {t('weather:snow')}: {day.snow ? day.snow['3h'] : 0} mm</p>
                    <p><Grain /> {t('weather:pop')}: {day.pop * 100}%</p>
                  </>
                )}
                {tabIndex === 3 && (
                  <>
                    <p><Brightness5 /> {t('weather:sunrise')}: {day.sys.sunrise ? new Date(day.sys.sunrise * 1000).toLocaleTimeString() : 'N/A'}</p>
                    <p><Brightness3 /> {t('weather:sunset')}: {day.sys.sunset ? new Date(day.sys.sunset * 1000).toLocaleTimeString() : 'N/A'}</p>
                    <p><Brightness5 /> {t('weather:moonrise')}: {day.sys.moonrise ? new Date(day.sys.moonrise * 1000).toLocaleTimeString() : 'N/A'}</p>
                    <p><Brightness3 /> {t('weather:moonset')}: {day.sys.moonset ? new Date(day.sys.moonset * 1000).toLocaleTimeString() : 'N/A'}</p>
                  </>
                )}
              </div>
            ))}
          </Box>
        </div>
      )}
    </div>
  );
}