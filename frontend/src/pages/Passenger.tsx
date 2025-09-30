import { RidesList } from '../components/RidesList';

export const Passenger = () => {
  return (
    <RidesList
      role="passenger"
      title="Мої поїздки як пасажир"
      emptyMessage="У вас немає поїздок як пасажир"
      className="passenger-page"
    />
  );
};

export default Passenger;