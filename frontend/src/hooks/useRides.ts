import { useState, useEffect } from 'react';
import { api } from '../api';
import type { Ride } from '../types';

export function useRides(role?: 'passenger' | 'driver') {
  const [rides, setRides] = useState<Ride[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    api
      .getRides(role, controller.signal)
      .then((data) => {
        setRides(data.rides);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name !== 'AbortError') {
          setError(err.message || 'Failed to load rides');
          setLoading(false);
        }
      });

    return () => controller.abort();
  }, [role]);

  return { rides, loading, error };
}