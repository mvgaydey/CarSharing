import { useMemo } from 'react';
import type { Coordinates } from '../types';

interface MapPlaceholderProps {
  coordinates?: Coordinates;
  origin?: string;
  destination?: string;
  className?: string;
}

export const MapPlaceholder = ({
  coordinates = { lat: 50.4501, lng: 30.5234 },
  origin,
  destination,
  className = ''
}: MapPlaceholderProps) => {
  const formattedCoordinates = useMemo(() => {
    return `${coordinates.lat.toFixed(4)}, ${coordinates.lng.toFixed(4)}`;
  }, [coordinates.lat, coordinates.lng]);

  return (
    <div className={`map-placeholder ${className}`}>
      <div className="map-container">
        <div className="map-overlay">
          <div className="route-markers">
            {origin && (
              <div className="marker marker-start">
                <div className="marker-pin yellow"></div>
                <span className="marker-label">{origin}</span>
              </div>
            )}
            {destination && (
              <div className="marker marker-end">
                <div className="marker-pin orange"></div>
                <span className="marker-label">{destination}</span>
              </div>
            )}
          </div>
          <div className="route-line"></div>
        </div>
        <div className="map-controls">
          <button className="control-btn location-btn">📍</button>
          <button className="control-btn zoom-in">+</button>
          <button className="control-btn zoom-out">-</button>
        </div>
        <div className="map-info">
          <span className="coordinates">
            {formattedCoordinates}
          </span>
        </div>
      </div>
    </div>
  );
};