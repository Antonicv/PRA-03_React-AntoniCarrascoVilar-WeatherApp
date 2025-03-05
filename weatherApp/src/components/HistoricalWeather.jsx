// HistoricalWeather.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { TextField, Button, Typography, Container, Box } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

const HistoricalWeather = () => {
  const { t } = useTranslation(['common', 'weather']);
  const [date, setDate] = useState(dayjs()); // Fecha seleccionada
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchHistoricalWeather = async () => {
    if (!date) return;
    setLoading(true);
    setError('');

    try {
      const apiKey = import.meta.env.VITE_OPEN_WEATHER_API_KEY; // Asegúrate de tener esta variable en tu .env
      const lat = 41.3851; // Latitud de Barcelona (puedes hacerlo dinámico)
      const lon = 2.1734; // Longitud de Barcelona (puedes hacerlo dinámico)
      const timestamp = date.unix(); // Convertir la fecha a timestamp

      const response = await axios.get(
        `https://api.openweathermap.org/data/3.0/onecall/timemachine?lat=${lat}&lon=${lon}&dt=${timestamp}&appid=${apiKey}&units=metric`
      );

      setWeatherData(response.data);
    } catch (err) {
      setError(t('weather:error'));
      console.error("Error fetching historical weather data:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom>
          {t('weather:historical_title')}
        </Typography>

        {/* Selector de fecha */}
        <DatePicker
          label={t('weather:select_date')}
          value={date}
          onChange={(newDate) => setDate(newDate)}
          renderInput={(params) => <TextField {...params} sx={{ mr: 2 }} />}
        />

        {/* Botón para buscar datos históricos */}
        <Button
          variant="contained"
          color="primary"
          onClick={fetchHistoricalWeather}
          disabled={loading}
        >
          {t('weather:search_button')}
        </Button>

        {/* Mostrar datos históricos */}
        {loading && <Typography sx={{ mt: 2 }}>{t('weather:loading')}</Typography>}
        {error && (
          <Typography sx={{ mt: 2, color: 'red' }}>{error}</Typography>
        )}
        {weatherData && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h5">
              {t('weather:historical_data_for')} {date.format('YYYY-MM-DD')}
            </Typography>
            <Typography>
              {t('common:temperature')}: {weatherData.current.temp}°C
            </Typography>
            <Typography>
              {t('common:condition')}:{' '}
              {weatherData.current.weather[0].description}
            </Typography>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default HistoricalWeather;