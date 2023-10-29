import { useState, useEffect } from 'react';
import { MapContainer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-boundary-canvas';
import L from 'leaflet';

const position = [51.505, -0.09];
const mapStyle = { width: '100%', height: '500px' };

export default function MapOne() {
  const [map, setMap] = useState(null);

  useEffect(() => {
    // if (!map) return;

    const fetchGeoJSON = async () => {
      console.log('called');
      const response = await fetch(
        'https://cdn.rawgit.com/johan/world.geo.json/34c96bba/countries/GBR.geo.json'
      );
      const geoJSON = await response.json();
      console.log(geoJSON);
      setMap(geoJSON)
      const osm = L.TileLayer.boundaryCanvas(
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        {
          boundary: geoJSON,
          attribution:
            '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors, UK shape <a href="https://github.com/johan/world.geo.json">johan/word.geo.json</a>',
        }
      );
      map?.addLayer(osm);
      const ukLayer = L.geoJSON(geoJSON);
      console.log(ukLayer);
      map?.fitBounds(ukLayer.getBounds());
    };

    fetchGeoJSON();
  }, []);

  return (
    <MapContainer
      // center={position}
      zoom={13}
      style={mapStyle}

      // whenCreated={setMap}
    >
      <GeoJSON
        data={map}
        onEachFeature={(feature, layer) => layer.on('click', () => {})}
      />
    </MapContainer>
  );
}
