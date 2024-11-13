import React, { useState } from 'react';
import { MapPin, Crosshair } from 'lucide-react';
import { getCurrentLocation } from '../utils/location';
import { Coordinates } from '../types';

interface LocationSearchProps {
  onLocationSelect: (coordinates: Coordinates | null) => void;
}

export const LocationSearch: React.FC<LocationSearchProps> = ({ onLocationSelect }) => {
  const [loading, setLoading] = useState(false);

  const handleCurrentLocation = async () => {
    setLoading(true);
    try {
      const position = await getCurrentLocation();
      onLocationSelect({
        lat: position.coords.latitude,
        lng: position.coords.longitude
      });
    } catch (error) {
      console.error('Error getting location:', error);
      alert('Unable to get your current location. Please check your browser settings.');
    } finally {
      setLoading(false);
    }
  };

  const handleClearLocation = () => {
    onLocationSelect(null);
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={handleCurrentLocation}
        disabled={loading}
        className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
      >
        <Crosshair className="w-5 h-5 mr-2" />
        {loading ? 'Getting location...' : 'Use Current Location'}
      </button>
      <button
        onClick={handleClearLocation}
        className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
      >
        <MapPin className="w-5 h-5 mr-2" />
        Clear Location
      </button>
    </div>
  );
};