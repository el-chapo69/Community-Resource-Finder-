import React from 'react';
import { Heart } from 'lucide-react';

interface FavoriteFilterProps {
  showFavorites: boolean;
  onToggle: () => void;
}

export const FavoriteFilter: React.FC<FavoriteFilterProps> = ({ showFavorites, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
        showFavorites
          ? 'bg-red-500 text-white'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
    >
      <Heart className={`w-4 h-4 ${showFavorites ? 'fill-current' : ''}`} />
      <span>Favorites</span>
    </button>
  );
};