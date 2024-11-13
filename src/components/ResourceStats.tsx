import React from 'react';
import { Resource } from '../types';
import { PieChart, Users, Clock, MapPin } from 'lucide-react';

interface ResourceStatsProps {
  resources: Resource[];
}

export const ResourceStats: React.FC<ResourceStatsProps> = ({ resources }) => {
  const stats = {
    total: resources.length,
    types: Object.entries(
      resources.reduce((acc, resource) => {
        acc[resource.type] = (acc[resource.type] || 0) + 1;
        return acc;
      }, {} as Record<string, number>)
    ),
    activeNow: resources.filter(r => {
      const [open, close] = r.hours.split('-').map(time => {
        const [hours, minutes] = time.trim().match(/(\d+)(?::(\d+))?\s*(AM|PM)/i)?.slice(1, 4) || [];
        let hour = parseInt(hours);
        if (minutes) hour += parseInt(minutes) / 60;
        if ((/pm/i).test(time) && hour < 12) hour += 12;
        if ((/am/i).test(time) && hour === 12) hour = 0;
        return hour;
      });
      const now = new Date().getHours() + new Date().getMinutes() / 60;
      return open <= now && now <= close;
    }).length
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      <div className="card p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Total Resources</p>
            <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
          </div>
          <PieChart className="w-8 h-8 text-primary" />
        </div>
      </div>

      <div className="card p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Currently Open</p>
            <p className="text-2xl font-bold text-gray-900">{stats.activeNow}</p>
          </div>
          <Clock className="w-8 h-8 text-green-500" />
        </div>
      </div>

      <div className="card p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Cities Covered</p>
            <p className="text-2xl font-bold text-gray-900">8</p>
          </div>
          <MapPin className="w-8 h-8 text-orange-500" />
        </div>
      </div>

      <div className="card p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">People Helped</p>
            <p className="text-2xl font-bold text-gray-900">1,200+</p>
          </div>
          <Users className="w-8 h-8 text-purple-500" />
        </div>
      </div>
    </div>
  );
};