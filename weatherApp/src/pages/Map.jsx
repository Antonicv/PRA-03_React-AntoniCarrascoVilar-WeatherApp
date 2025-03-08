import React, { useState, useRef, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { useTranslation } from 'react-i18next';
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

export default function MapView() {
  const { t } = useTranslation();
  const [coords, setCoords] = useState({ lat: 41.3851, lng: 2.1734 });
  const [searchText, setSearchText] = useState('');
  const [error, setError] = useState('');
  const [cityName, setCityName] = useState('Barcelona');
  const mapRef = useRef();

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
        setError(t('city_not_found'));
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
    <div className="map-container">
      {/* Barra de búsqueda */}
      <div className="search-bar">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder={t('search_placeholder')}
          />
          <button type="submit">{t('search')}</button>
        </form>
        {error && <div className="error-message">{error}</div>}
      </div>

      {/* Mapa */}
      <MapContainer
        center={[coords.lat, coords.lng]}
        zoom={13}
        ref={mapRef}
        className="map"
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

      <style jsx>{`
        .map-container {
          height: 100vh;
          width: 100%;
          position: relative;
        }
        
        .search-bar {
          position: absolute;
          top: 20px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 1000;
          width: 90%;
          max-width: 500px;
        }
        
        form {
          display: flex;
          gap: 10px;
          background: white;
          padding: 10px;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        
        input {
          flex: 1;
          padding: 12px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 16px;
        }
        
        button {
          padding: 12px 24px;
          background: #007bff;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        
        .error-message {
          color: #dc3545;
          margin-top: 8px;
          padding: 8px;
          background: #ffeef0;
          border-radius: 4px;
        }
        
        .map {
          height: 100%;
          width: 100%;
        }
      `}</style>
    </div>
  );
}