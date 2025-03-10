// Código del componente MapView
// ------------------------------------------------------------
// Este componente muestra un mapa interactivo utilizando react-leaflet y permite buscar ciudades para centrar el mapa en ellas.

// Importa las librerías necesarias
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { useTranslation } from 'react-i18next';
import { Container, Box } from '@mui/material';
import 'leaflet/dist/leaflet.css';

// Fix para los iconos de Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// Componente para actualizar el mapa
function MapUpdater({ coords }) {
  const map = useMap();

  useEffect(() => {
    if (coords?.lat && coords?.lng) {
      map.flyTo([coords.lat, coords.lng], 13, { animate: true });
    }
  }, [coords, map]);

  return null;
}

// Componente principal del mapa
export default function MapView() {
  const { t } = useTranslation();
  const [coords, setCoords] = useState({ lat: 41.3851, lng: 2.1734 });
  const [searchText, setSearchText] = useState('');
  const [error, setError] = useState('');
  const [cityName, setCityName] = useState('Barcelona');

  // Buscar coordenadas
  const handleSearch = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchText)}`
      );
      
      if (!response.ok) throw new Error('API Error');
      
      const data = await response.json();
      
      if (data.length === 0) {
        setError(t('map:city_not_found'));
        return;
      }

      const firstResult = data[0];
      setCoords({
        lat: parseFloat(firstResult.lat),
        lng: parseFloat(firstResult.lon)
      });
      setCityName(firstResult.display_name || searchText);
      
    } catch (err) {
      setError(t('search_error'));
      console.error('Geocoding error:', err);
    }
  };

  return (
    <Container 
      maxWidth={false} 
      sx={{ 
        height: '100vh',
        width: '100%',
        p: 0,
        position: 'relative',
        top: 66,
        marginBottom: 6
      }}
    >
      {/* Barra de búsqueda */}
      <Box
        sx={{
          position: 'absolute',
          top: -80,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1000,
          width: '100%',
          maxWidth: 500,
          bgcolor: 'background.paper',
          borderRadius: 1,
          boxShadow: 3,
          p: 1
        }}
      >
        <form onSubmit={handleSearch}>
          <Box display="flex" gap={1}>
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder={t('map:search_placeholder')}
              style={{
                flex: 1,
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '16px'
              }}
            />
            <button
              type="submit"
              style={{
                padding: '12px 24px',
                background: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              {t('map:search')}
            </button>
          </Box>
        </form>
        {error && (
          <Box
            sx={{
              color: 'error.main',
              mt: 1,
              p: 1,
              bgcolor: 'error.light',
              borderRadius: 1
            }}
          >
            {error}
          </Box>
        )}
      </Box>

      {/* Mapa */}
      <MapContainer
        center={[coords.lat, coords.lng]}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
      >
        <MapUpdater coords={coords} />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap'
        />
        <Marker position={[coords.lat, coords.lng]}>
          <Popup>{cityName}</Popup>
        </Marker>
      </MapContainer>
    </Container>
  );
}