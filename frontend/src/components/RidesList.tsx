import { NavBar } from 'antd-mobile';
import { useNavigate } from 'react-router-dom';
import { LoadingSpinner } from './LoadingSpinner';
import { ErrorMessage } from './ErrorMessage';
import { EmptyState } from './EmptyState';
import { RideCard } from './RideCard';
import { useRides } from '../hooks/useRides';

interface RidesListProps {
  role: 'passenger' | 'driver';
  title: string;
  emptyMessage: string;
  className?: string;
}

export const RidesList = ({
  role,
  title,
  emptyMessage,
  className = ''
}: RidesListProps) => {
  const navigate = useNavigate();
  const { rides, loading, error } = useRides(role);

  const handleBack = () => navigate('/');

  if (loading) {
    return (
      <div className={className}>
        <NavBar onBack={handleBack} className={`${role}-navbar`}>
          {title}
        </NavBar>
        <LoadingSpinner message="Завантаження поїздок..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className={className}>
        <NavBar onBack={handleBack} className={`${role}-navbar`}>
          {title}
        </NavBar>
        <ErrorMessage message={error} />
      </div>
    );
  }

  if (rides.length === 0) {
    return (
      <div className={className}>
        <NavBar onBack={handleBack} className={`${role}-navbar`}>
          {title}
        </NavBar>
        <EmptyState description={emptyMessage} />
      </div>
    );
  }

  return (
    <div className={className}>
      <NavBar onBack={handleBack} className={`${role}-navbar`}>
        {title}
      </NavBar>
      <div className="rides-container">
        <div className="rides-list">
          {rides.map((ride) => (
            <RideCard key={ride.id} ride={ride} />
          ))}
        </div>
      </div>
    </div>
  );
};