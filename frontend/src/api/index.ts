import type { FeatureFlags, RidesResponse, ApiError } from '../types';

const BASE_URL = 'http://localhost:8001/api';

async function fetchApi<T>(endpoint: string, signal?: AbortSignal): Promise<T> {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      signal,
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      const error: ApiError = {
        message: response.statusText || 'Request failed',
        status: response.status,
      };
      throw error;
    }

    return response.json();
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw error;
    }
    throw error as ApiError;
  }
}

export const api = {
  getHealth: (signal?: AbortSignal) =>
    fetchApi<{ status: string }>('/health', signal),

  getFlags: (signal?: AbortSignal) =>
    fetchApi<FeatureFlags>('/flags', signal),

  getRides: (role?: string, signal?: AbortSignal) =>
    fetchApi<RidesResponse>(
      `/rides${role ? `?role=${role}` : ''}`,
      signal
    ),
};