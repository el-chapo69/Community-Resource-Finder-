import React, { useCallback, useMemo, useState } from 'react';
import Map, { Marker, Popup, NavigationControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Resource } from '../types';
import { MapPin, AlertCircle } from 'lucide-react';

interface MapViewProps {
  resources: Resource[];
  userLocation: { lat: number; lng: number } | null;
}

const MAPBOX_TOKEN = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';

export const MapView: React.FC<MapViewProps> = ({ resources, userLocation }) => {
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [mapError, setMapError] = useState<string | null>(null);

  // Center on Nairobi by default
  const initialViewState = useMemo(() => ({
    longitude: userLocation?.lng || 36.8219,
    latitude: userLocation?.lat || -1.2921,
    zoom: 9
  }), [userLocation]);

  const getMarkerColor = useCallback((type: string) => {
    const colors: Record<string, string> = {
      food: '#EF4444',
      shelter: '#8B5CF6',
      health: '#10B981',
      education: '#F59E0B',
      employment: '#3B82F6'
    };
    return colors[type] || '#6B7280';
  }, []);

  if (mapError) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-gray-50">
        <div className="text-center p-6">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Map Loading Error</h3>
          <p className="text-gray-600">{mapError}</p>
        </div>
      </div>
    );
  }

  return (
    <Map
      mapboxAccessToken={MAPBOX_TOKEN}
      initialViewState={initialViewState}
      style={{ width: '100%', height: '100%' }}
      mapStyle="mapbox://styles/mapbox/streets-v12"
      onError={(e) => setMapError(e.error.message)}
    >
      <NavigationControl position="top-right" />

      {userLocation && (
        <Marker
          longitude={userLocation.lng}
          latitude={userLocation.lat}
          anchor="center"
        >
          <div className="w-6 h-6 bg-blue-500 rounded-full border-2 border-white shadow-lg pulse-animation" />
        </Marker>
      )}

      {resources.map((resource) => (
        <Marker
          key={resource.id}
          longitude={resource.coordinates.lng}
          latitude={resource.coordinates.lat}
          anchor="bottom"
          onClick={(e) => {
            e.originalEvent.stopPropagation();
            setSelectedResource(resource);
          }}
        >
          <MapPin
            className="w-6 h-6 cursor-pointer transform transition-transform hover:scale-110"
            fill={getMarkerColor(resource.type)}
            color="white"
          />
        </Marker>
      ))}

      {selectedResource && (
        <Popup
          longitude={selectedResource.coordinates.lng}
          latitude={selectedResource.coordinates.lat}
          anchor="bottom"
          onClose={() => setSelectedResource(null)}
          className="max-w-sm"
        >
          <div className="p-2">
            <h3 className="font-bold text-lg mb-1">{selectedResource.name}</h3>
            <p className="text-sm text-gray-600 mb-2">{selectedResource.description}</p>
            <div className="text-sm">
              <p className="font-semibold">{selectedResource.address}</p>
              <p>{selectedResource.phone}</p>
              <p className="text-blue-600">{selectedResource.hours}</p>
            </div>
          </div>
        </Popup>
      )}
    </Map>
  );
};