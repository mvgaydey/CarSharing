import { ErrorBlock as AntdErrorBlock, Button } from 'antd-mobile';

interface ErrorMessageProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  className?: string;
}

export const ErrorMessage = ({
  title = 'Помилка',
  message,
  onRetry,
  className = 'error-container'
}: ErrorMessageProps) => {
  return (
    <div className={className}>
      <AntdErrorBlock
        status="default"
        title={title}
        description={message}
      />
      {onRetry && (
        <Button className="retry-button" onClick={onRetry}>
          Спробувати знову
        </Button>
      )}
    </div>
  );
};