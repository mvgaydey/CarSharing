import { Component, type ReactNode, type ErrorInfo } from 'react';
import { ErrorBlock, Button } from 'antd-mobile';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="error-boundary">
          <ErrorBlock
            status="default"
            title="Щось пішло не так"
            description={this.state.error?.message || 'Невідома помилка'}
          />
          <Button onClick={this.handleRetry}>
            Спробувати знову
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}