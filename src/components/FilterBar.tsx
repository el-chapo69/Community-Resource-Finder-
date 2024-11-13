import React from 'react';
import { ResourceType } from '../types';

interface FilterBarProps {
  selectedType: ResourceType | 'all';
  onTypeChange: (type: ResourceType | 'all') => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({ selectedType, onTypeChange }) => {
  const types: (ResourceType | 'all')[] = ['all', 'food', 'shelter', 'health', 'education', 'employment'];

  return (
    <div className="flex flex-wrap gap-2">
      {types.map((type) => (
        <button
          key={type}
          onClick={() => onTypeChange(type)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
            ${selectedType === type
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </button>
      ))}
    </div>
  );
};