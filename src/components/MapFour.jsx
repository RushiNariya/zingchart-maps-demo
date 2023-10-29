import React from 'react';
import { MapContainer, TileLayer, GeoJSON, LayerGroup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const usaBordersGeoJSON = {
  // Replace this with the actual GeoJSON data for USA borders
  type: 'FeatureCollection',
  features: [...],
};

const maskPolygon = {
  type: 'FeatureCollection',
  features: [
    // Create a polygon that covers the whole world except the USA
    {
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-180, 90],
            [-180, -90],
            [180, -90],
            [180, 90],
            [-180, 90],
          ],
          ...USA_BORDER_COORDINATES, // Coordinates of the USA border
        ],
      },
    },
  ],
};

const MapComponent = () => {
  return (
    <MapContainer center={[37.0902, -95.7129]} zoom={4} style={{ width: '800px', height: '600px' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <LayerGroup>
        <GeoJSON data={maskPolygon} style={{ color: 'white' }} />
        <GeoJSON data={usaBordersGeoJSON} />
      </LayerGroup>
    </MapContainer>
  );
};

export default MapComponent;
