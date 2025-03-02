import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

// Estilo personalizado para el ícono del marcador
const customIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

export default function MapView() {
  const { t } = useTranslation(['common', 'map']); // Traducciones
  const [city, setCity] = useState('Barcelona'); // Ciudad por defecto
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Coordenadas por defecto (Barcelona)
  const defaultPosition = [41.41682744893083, 2.1340861825957607];

  // Obtener datos meteorológicos
  const fetchWeatherData = async () => {
    if (!city) return;
    setLoading(true);
    setError('');
    try {
      const apiKey = process.env.REACT_APP_OPEN_WEATHER_API_KEY;
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      setWeatherData(response.data);
    } catch (err) {
      setError(t('map:error'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, [city]);

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      {/* Input para buscar ciudad */}
      <div style={{ marginBottom: 16, textAlign: 'center', padding: '16px 0' }}>
        <input
          type="text"
          placeholder={t('map:search_placeholder')}
          value={city}
          onChange={(e) => setCity(e.target.value)}
          style={{ padding: '8px', width: '300px', marginRight: '8px' }}
        />
        <button onClick={fetchWeatherData} style={{ padding: '8px 16px' }}>
          {t('map:search_button')}
        </button>
      </div>

      {/* Mapa */}
      <MapContainer center={defaultPosition} zoom={13} style={{ height: '80%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* Mostrar marcador con datos meteorológicos */}
        {weatherData && (
          <Marker
            position={[weatherData.coord.lat, weatherData.coord.lon]}
            icon={customIcon}
          >
            <Popup>
              <div>
                <h3>{weatherData.name}</h3>
                <p>
                  {t('common:temperature')}: {weatherData.main.temp}°C
                </p>
                <p>
                  {t('common:condition')}: {weatherData.weather[0].description}
                </p>
              </div>
            </Popup>
          </Marker>
        )}
      </MapContainer>

      {/* Mensajes de carga y error */}
      {loading && <p style={{ textAlign: 'center' }}>{t('map:loading')}</p>}
      {error && <p style={{ textAlign: 'center', color: 'red' }}>{error}</p>}
    </div>
  );
}