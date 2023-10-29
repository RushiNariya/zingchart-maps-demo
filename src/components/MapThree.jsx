/* eslint-disable no-unused-vars */
import React from 'react';
import { MapContainer, TileLayer, useMap, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
// import './App.css';

function MapThree() {
  const usaBorders = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        properties: {},
        geometry: {
          coordinates: [-97.60390800179374, 39.14613253285262],
          type: 'Point',
        },
      },
      {
        type: 'Feature',
        properties: {},
        geometry: {
          coordinates: [
            [-124.40047562026871, 48.44171635698143],
            [-95.11794596315372, 49.18400063965771],
            [-66.44058395980123, 44.898799436692116],
            [-80.37188529287714, 25.001495663148106],
            [-97.23116852667391, 26.011522417479853],
            [-117.52415674171473, 32.94244969374445],
            [-124.96355982308867, 48.59543084452508],
          ],
          type: 'LineString',
        },
      },
    ],
  };

  return (
    <div className="MapThree">
      <h1>USA Map</h1>
      <MapContainer center={[37.0902, -95.7129]} zoom={4} style={{ width: '800px', height: '600px' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <GeoJSON data={usaBorders} />
    </MapContainer>
    </div>
  );
}

export default MapThree;
