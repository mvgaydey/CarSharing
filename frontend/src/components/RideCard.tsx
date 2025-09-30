import { useMemo } from 'react';
import { Card } from 'antd-mobile';
import { useFeatureFlags } from '../hooks/useFeatureFlags';
import { MapPlaceholder } from './MapPlaceholder';
import { MapDisabled } from './MapDisabled';
import type { Ride, FeatureFlagKey } from '../types';

interface RideCardProps {
  ride: Ride;
}

const formatTime = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' });
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('uk-UA', { day: '2-digit', month: 'short' });
};

const ROLE_ICONS = {
  passenger: '🧑',
  driver: '🚗',
} as const;

const getFeatureFlagKey = (role: Ride['role']): FeatureFlagKey => {
  return role === 'passenger' ? 'passengerRouteMap' : 'driverRouteMapPreview';
};

export const RideCard = ({ ride }: RideCardProps) => {
  const { isEnabled } = useFeatureFlags();

  const featureFlagKey = useMemo(() => {
    return getFeatureFlagKey(ride.role);
  }, [ride.role]);

  const isMapEnabled = isEnabled(featureFlagKey);
  const formattedTime = useMemo(() => formatTime(ride.when), [ride.when]);
  const formattedDate = useMemo(() => formatDate(ride.when), [ride.when]);

  return (
    <Card className="ride-card">
      <div className="ride-card-header">
        <div className="ride-left">
          <div className="ride-role">
            <span className={`role-badge ${ride.role}`}>
              {ROLE_ICONS[ride.role]}
            </span>
          </div>
          <div className="ride-info">
            <div className="ride-route">
              <div className="route-point start">
                <span className="route-dot"></span>
                <span className="route-text">{ride.from}</span>
              </div>
              <div className="route-point end">
                <span className="route-dot"></span>
                <span className="route-text">{ride.to}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="ride-time">
          <span className="time">{formattedTime}</span>
          <span className="date">{formattedDate}</span>
        </div>
      </div>

      <div className="ride-map-section">
        {isMapEnabled ? (
          <MapPlaceholder
            coordinates={ride.coords}
            origin={ride.from}
            destination={ride.to}
            className="ride-map"
          />
        ) : (
          <MapDisabled className="ride-map" />
        )}
      </div>
    </Card>
  );
};