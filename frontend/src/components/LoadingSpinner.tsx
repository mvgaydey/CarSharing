import { SpinLoading } from 'antd-mobile';

interface LoadingSpinnerProps {
  message?: string;
  size?: string;
  className?: string;
}

export const LoadingSpinner = ({
  message,
  size = '48px',
  className = 'loading-container'
}: LoadingSpinnerProps) => (
  <div className={className}>
    <SpinLoading style={{ '--size': size } as React.CSSProperties} />
    {message && <p>{message}</p>}
  </div>
);