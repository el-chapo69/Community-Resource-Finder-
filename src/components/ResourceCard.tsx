import React, { useState } from 'react';
import { Phone, Clock, MapPin, ChevronDown, ChevronUp, ExternalLink, Heart } from 'lucide-react';
import { Resource } from '../types';
import { ShareButton } from './ShareButton';

interface ResourceCardProps {
  resource: Resource;
}

export const ResourceCard: React.FC<ResourceCardProps> = ({ resource }) => {
  const [expanded, setExpanded] = useState(false);
  const [isFavorite, setIsFavorite] = useState(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    return favorites.includes(resource.id);
  });

  const typeColors: Record<string, { bg: string; text: string }> = {
    food: { bg: 'bg-orange-100', text: 'text-orange-800' },
    shelter: { bg: 'bg-purple-100', text: 'text-purple-800' },
    health: { bg: 'bg-emerald-100', text: 'text-emerald-800' },
    education: { bg: 'bg-blue-100', text: 'text-blue-800' },
    employment: { bg: 'bg-indigo-100', text: 'text-indigo-800' },
  };

  const { bg, text } = typeColors[resource.type] || { bg: 'bg-gray-100', text: 'text-gray-800' };

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    let newFavorites;
    if (isFavorite) {
      newFavorites = favorites.filter((id: string) => id !== resource.id);
    } else {
      newFavorites = [...favorites, resource.id];
    }
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
    setIsFavorite(!isFavorite);
  };

  const isOpen = () => {
    const [open, close] = resource.hours.split('-').map(time => {
      const [hours, minutes] = time.trim().match(/(\d+)(?::(\d+))?\s*(AM|PM)/i)?.slice(1, 4) || [];
      let hour = parseInt(hours);
      if (minutes) hour += parseInt(minutes) / 60;
      if ((/pm/i).test(time) && hour < 12) hour += 12;
      if ((/am/i).test(time) && hour === 12) hour = 0;
      return hour;
    });
    const now = new Date().getHours() + new Date().getMinutes() / 60;
    return open <= now && now <= close;
  };

  return (
    <div className="card overflow-hidden group hover:scale-[1.02] transition-all duration-300">
      <div className="relative h-48 overflow-hidden">
        <img
          src={resource.image}
          alt={resource.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-4 right-4 flex gap-2">
          <button
            onClick={toggleFavorite}
            className={`p-2 rounded-full ${
              isFavorite ? 'bg-red-500' : 'bg-white'
            } shadow-md transition-colors`}
          >
            <Heart
              className={`w-5 h-5 ${
                isFavorite ? 'text-white fill-current' : 'text-gray-600'
              }`}
            />
          </button>
          <span className={`badge ${bg} ${text} shadow-sm`}>
            {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
          </span>
        </div>
        {resource.distance && (
          <div className="absolute bottom-4 left-4">
            <span className="badge bg-primary-600 text-white shadow-md">
              {resource.distance.toFixed(1)} km away
            </span>
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-heading text-xl font-bold text-gray-900">{resource.name}</h3>
          <span className={`px-2 py-1 text-sm rounded ${
            isOpen() ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {isOpen() ? 'Open Now' : 'Closed'}
          </span>
        </div>
        <p className="text-gray-600 mb-4 line-clamp-2">{resource.description}</p>
        
        <div className="space-y-3">
          <div className="flex items-center text-gray-600 group/item">
            <MapPin className="w-5 h-5 mr-2 flex-shrink-0 text-primary-500 group-hover/item:text-primary-600" />
            <span className="group-hover/item:text-gray-900 transition-colors">{resource.address}</span>
          </div>
          <a
            href={`tel:${resource.phone}`}
            className="flex items-center text-gray-600 hover:text-primary-600 transition-colors group/phone"
          >
            <Phone className="w-5 h-5 mr-2 flex-shrink-0 group-hover/phone:scale-110 transition-transform" />
            <span>{resource.phone}</span>
          </a>
          <div className="flex items-center text-gray-600">
            <Clock className="w-5 h-5 mr-2 flex-shrink-0 text-primary-500" />
            <span>{resource.hours}</span>
          </div>
        </div>

        <div className="mt-4">
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center justify-between w-full text-left text-gray-900 font-semibold hover:text-primary-600 transition-colors"
          >
            <span>Available Services</span>
            {expanded ? (
              <ChevronUp className="w-5 h-5" />
            ) : (
              <ChevronDown className="w-5 h-5" />
            )}
          </button>
          
          <div className={`mt-2 space-y-2 transition-all duration-300 ${expanded ? 'block' : 'hidden'}`}>
            {resource.services.map((service, index) => (
              <div
                key={index}
                className="flex items-center px-3 py-2 bg-gray-50 rounded-lg text-sm text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <div className="w-2 h-2 rounded-full bg-primary-500 mr-2" />
                {service}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 pt-4 border-t">
          <div className="flex items-center justify-between mb-4">
            <ShareButton resource={resource} />
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                `${resource.name} ${resource.address}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Get Directions
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};