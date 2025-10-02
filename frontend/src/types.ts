// API Types
export interface FeatureFlags {
  passengerRouteMap: boolean;
  driverRouteMapPreview: boolean;
  showSettings: boolean;
}

export type FeatureFlagKey = keyof FeatureFlags;

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Ride {
  id: string;
  role: 'passenger' | 'driver';
  from: string;
  to: string;
  when: string;
  coords: Coordinates;
}

export interface RidesResponse {
  rides: Ride[];
}

export interface ApiError {
  message: string;
  status?: number;
}