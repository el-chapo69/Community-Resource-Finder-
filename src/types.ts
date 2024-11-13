export interface Resource {
  id: string;
  name: string;
  type: ResourceType;
  description: string;
  address: string;
  phone: string;
  hours: string;
  image: string;
  services: string[];
  coordinates: {
    lat: number;
    lng: number;
  };
  distance?: number;
}

export type ResourceType = 'food' | 'shelter' | 'health' | 'education' | 'employment';

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  favorites: string[];
  createdAt: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}