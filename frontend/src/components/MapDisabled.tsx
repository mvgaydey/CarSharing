interface MapDisabledProps {
  className?: string;
}

export const MapDisabled = ({ className = '' }: MapDisabledProps) => {
  return (
    <div className={`map-disabled ${className}`}>
      <div className="map-disabled-content">
        <div className="map-disabled-icon">🗺️</div>
        <h3 className="map-disabled-title">Карта вимкнена</h3>
        <p className="map-disabled-text">
          Увімкніть відображення карти в налаштуваннях
        </p>
      </div>
    </div>
  );
};