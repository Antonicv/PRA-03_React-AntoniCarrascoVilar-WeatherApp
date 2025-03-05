import React, { useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import axios from 'axios';
import { useTranslation } from 'react-i18next';


// Componente para actualizar la vista del mapa
function ChangeView({ center, zoom }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

// Estilo personalizado para el ícono del marcador
const customIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

export default function MapView() {
  const { t } = useTranslation(['common', 'map']);
  const [city, setCity] = useState('Barcelona');
  const [weatherData, setWeatherData] = useState(null);
  const [position, setPosition] = useState([41.41682744893083, 2.1340861825957607]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const mapRef = useRef();

  // const fetchWeatherData = async () => {
  //   if (!city) return;
  //   setLoading(true);
  //   setError('');
  //   try {
  //     const apiKey = process.env.REACT_APP_OPEN_WEATHER_API_KEY;
  //     if (!apiKey) {
  //       setError(t('map:missing_api_key'));
  //       setLoading(false);
  //       return;
  //     }
  //     const response = await axios.get(
  //       `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
  //     );
  //     setWeatherData(response.data);
  //     setPosition([response.data.coord.lat, response.data.coord.lon]);
  //   } catch (err) {
  //     setError(t('map:error'));
  //     setPosition([41.41682744893083, 2.1340861825957607]); // Reset to default position
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchWeatherData();
  };

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      {/* Formulario de búsqueda */}
      <form onSubmit={handleSearch} style={{ marginBottom: 16, textAlign: 'center', padding: '16px 0' }}>
        <input
          type="text"
          placeholder={t('map:search_placeholder')}
          value={city}
          onChange={(e) => setCity(e.target.value)}
          style={{ padding: '8px', width: '300px', marginRight: '8px' }}
        />
        <button type="submit" style={{ padding: '8px 16px' }}>
          {t('map:search_button')}
        </button>
      </form>

      {/* Mapa */}
      <MapContainer
        center={position}
        zoom={13}
        style={{ height: '80%', width: '100%' }}
        whenCreated={mapInstance => mapRef.current = mapInstance}
      >
        <ChangeView center={position} zoom={13} />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

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

      {/* Mensajes de estado */}
      {loading && <p style={{ textAlign: 'center' }}>{t('map:loading')}</p>}
      {error && <p style={{ textAlign: 'center', color: 'red' }}>{error}</p>}
    </div>
  );
}