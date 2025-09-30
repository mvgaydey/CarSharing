import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { api } from '../api';
import type { FeatureFlags, FeatureFlagKey } from '../types';

interface FeatureFlagContext {
  flags: FeatureFlags;
  loading: boolean;
  error: string | null;
  isEnabled: (key: FeatureFlagKey) => boolean;
  enable: (key: FeatureFlagKey) => void;
  disable: (key: FeatureFlagKey) => void;
  toggle: (key: FeatureFlagKey) => void;
  reset: () => void;
}

const STORAGE_KEY = 'feature_flags';
const DEFAULT_FLAGS: FeatureFlags = {
  passengerRouteMap: false,
  driverRouteMapPreview: false,
};

const FeatureFlagContext = createContext<FeatureFlagContext | null>(null);

export function FeatureFlagProvider({ children }: { children: ReactNode }) {
  const [flags, setFlags] = useState<FeatureFlags>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : DEFAULT_FLAGS;
    } catch {
      return DEFAULT_FLAGS;
    }
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    api
      .getFlags(controller.signal)
      .then((data) => {
        setFlags(data);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name !== 'AbortError') {
          setError(err.message || 'Failed to load feature flags');
          setLoading(false);
        }
      });

    return () => controller.abort();
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(flags));
    } catch (err) {
      console.error('Failed to save flags to localStorage:', err);
    }
  }, [flags]);

  const isEnabled = (key: FeatureFlagKey) => flags[key];

  const enable = (key: FeatureFlagKey) => {
    setFlags((prev) => ({ ...prev, [key]: true }));
  };

  const disable = (key: FeatureFlagKey) => {
    setFlags((prev) => ({ ...prev, [key]: false }));
  };

  const toggle = (key: FeatureFlagKey) => {
    setFlags((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const reset = () => {
    setFlags(DEFAULT_FLAGS);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (err) {
      console.error('Failed to clear flags from localStorage:', err);
    }
  };

  return (
    <FeatureFlagContext.Provider
      value={{ flags, loading, error, isEnabled, enable, disable, toggle, reset }}
    >
      {children}
    </FeatureFlagContext.Provider>
  );
}

export function useFeatureFlags() {
  const context = useContext(FeatureFlagContext);
  if (!context) {
    throw new Error('useFeatureFlags must be used within a FeatureFlagProvider');
  }
  return context;
}