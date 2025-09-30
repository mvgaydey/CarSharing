import { RidesList } from '../components/RidesList';

export const Driver = () => {
  return (
    <RidesList
      role="driver"
      title="Мої поїздки як водій"
      emptyMessage="У вас немає поїздок як водій"
      className="driver-page"
    />
  );
};

export default Driver;