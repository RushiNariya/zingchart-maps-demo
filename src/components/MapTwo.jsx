/* eslint-disable react/prop-types */
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
// import './App.css';

// Custom component to set map view to USA
function SetMapView({ bounds }) {
  const map = useMap();
  map.fitBounds(bounds);
  return null;
}

function MapTwo() {
  // Define bounds for the USA
  const usaBounds = [
    [24.396308, -125.000000], // Southwest corner coordinates
    [49.384358, -66.934570],  // Northeast corner coordinates
  ];

  return (
    <div className="MapTwo">
      <h1>USA Map</h1>
      <MapContainer center={[37.0902, -95.7129]} zoom={4} style={{ height: '500px', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <SetMapView bounds={usaBounds} />
      </MapContainer>
    </div>
  );
}

export default MapTwo;
