import React, { useState, useMemo } from 'react';
import { Compass, Plus } from 'lucide-react';
import { ResourceCard } from './components/ResourceCard';
import { SearchBar } from './components/SearchBar';
import { FilterBar } from './components/FilterBar';
import { LocationSearch } from './components/LocationSearch';
import { MapView } from './components/Map';
import { SubmitResource } from './components/SubmitResource';
import { ThemeToggle } from './components/ThemeToggle';
import { ResourceStats } from './components/ResourceStats';
import { FavoriteFilter } from './components/FavoriteFilter';
import { resources } from './data/resources';
import { ResourceType, Coordinates } from './types';
import { calculateDistance } from './utils/location';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<ResourceType | 'all'>('all');
  const [userLocation, setUserLocation] = useState<Coordinates | null>(null);
  const [showMap, setShowMap] = useState(true);
  const [showSubmitForm, setShowSubmitForm] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);

  const filteredResources = useMemo(() => {
    let filtered = resources.filter((resource) => {
      const matchesSearch = resource.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.services.some(service => service.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesType = selectedType === 'all' || resource.type === selectedType;

      const matchesFavorites = !showFavorites || (() => {
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        return favorites.includes(resource.id);
      })();
      
      return matchesSearch && matchesType && matchesFavorites;
    });

    if (userLocation) {
      filtered = filtered.map(resource => ({
        ...resource,
        distance: calculateDistance(
          userLocation.lat,
          userLocation.lng,
          resource.coordinates.lat,
          resource.coordinates.lng
        )
      })).sort((a, b) => (a.distance || 0) - (b.distance || 0));
    }

    return filtered;
  }, [searchTerm, selectedType, userLocation, showFavorites]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Compass className="h-8 w-8 text-primary float-animation" />
              <h1 className="ml-3 text-2xl font-heading font-bold gradient-text">
                Community Resource Finder
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <button
                onClick={() => setShowSubmitForm(true)}
                className="btn"
              >
                <Plus className="w-5 h-5 mr-2" />
                Submit Resource
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Section */}
        <ResourceStats resources={resources} />

        {/* Search and Filter Section */}
        <div className="space-y-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
            <SearchBar
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
            />
            <LocationSearch onLocationSelect={setUserLocation} />
            <FavoriteFilter
              showFavorites={showFavorites}
              onToggle={() => setShowFavorites(!showFavorites)}
            />
            <button
              onClick={() => setShowMap(prev => !prev)}
              className="px-4 py-2 text-sm font-medium text-primary bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors"
            >
              {showMap ? 'Show List View' : 'Show Map View'}
            </button>
          </div>
          <FilterBar
            selectedType={selectedType}
            onTypeChange={setSelectedType}
          />
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Found <span className="font-semibold text-gray-900">{filteredResources.length}</span> resources
            {selectedType !== 'all' && (
              <span> of type <span className="font-semibold text-primary">{selectedType}</span></span>
            )}
            {searchTerm && (
              <span> matching "<span className="font-semibold text-primary">{searchTerm}</span>"</span>
            )}
            {showFavorites && (
              <span> in your <span className="font-semibold text-red-500">favorites</span></span>
            )}
          </p>
        </div>

        {/* Map/List Toggle View */}
        {showMap ? (
          <div className="h-[600px] rounded-xl overflow-hidden shadow-lg">
            <MapView resources={filteredResources} userLocation={userLocation} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
            {filteredResources.length === 0 && (
              <div className="col-span-full text-center py-12">
                <h3 className="text-lg font-heading font-semibold mb-2">
                  No resources found
                </h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or filters to find what you're looking for.
                </p>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-border mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-muted-foreground">
            © 2024 Community Resource Finder. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Submit Resource Modal */}
      {showSubmitForm && (
        <SubmitResource onClose={() => setShowSubmitForm(false)} />
      )}
    </div>
  );
}

export default App;