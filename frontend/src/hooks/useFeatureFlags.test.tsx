import { renderHook, act, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { FeatureFlagProvider, useFeatureFlags } from './useFeatureFlags';

// Mock fetch
global.fetch = vi.fn();

describe('useFeatureFlags', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('should load flags from backend on mount', async () => {
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        passengerRouteMap: true,
        driverRouteMapPreview: false,
      }),
    });

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <FeatureFlagProvider>{children}</FeatureFlagProvider>
    );

    const { result } = renderHook(() => useFeatureFlags(), { wrapper });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.isEnabled('passengerRouteMap')).toBe(true);
    expect(result.current.isEnabled('driverRouteMapPreview')).toBe(false);
  });

  it('should toggle flags on/off deterministically', async () => {
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        passengerRouteMap: false,
        driverRouteMapPreview: false,
      }),
    });

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <FeatureFlagProvider>{children}</FeatureFlagProvider>
    );

    const { result } = renderHook(() => useFeatureFlags(), { wrapper });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    // Initially OFF
    expect(result.current.isEnabled('passengerRouteMap')).toBe(false);

    // Enable
    act(() => {
      result.current.enable('passengerRouteMap');
    });

    expect(result.current.isEnabled('passengerRouteMap')).toBe(true);

    // Disable
    act(() => {
      result.current.disable('passengerRouteMap');
    });

    expect(result.current.isEnabled('passengerRouteMap')).toBe(false);
  });

  it('should toggle flag using toggle function', async () => {
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        passengerRouteMap: false,
        driverRouteMapPreview: false,
      }),
    });

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <FeatureFlagProvider>{children}</FeatureFlagProvider>
    );

    const { result } = renderHook(() => useFeatureFlags(), { wrapper });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.isEnabled('passengerRouteMap')).toBe(false);

    act(() => {
      result.current.toggle('passengerRouteMap');
    });

    expect(result.current.isEnabled('passengerRouteMap')).toBe(true);

    act(() => {
      result.current.toggle('passengerRouteMap');
    });

    expect(result.current.isEnabled('passengerRouteMap')).toBe(false);
  });

  it('should persist flags to localStorage', async () => {
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        passengerRouteMap: false,
        driverRouteMapPreview: false,
      }),
    });

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <FeatureFlagProvider>{children}</FeatureFlagProvider>
    );

    const { result } = renderHook(() => useFeatureFlags(), { wrapper });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    act(() => {
      result.current.enable('passengerRouteMap');
    });

    await waitFor(() => {
      const stored = localStorage.getItem('feature_flags');
      expect(stored).toBeTruthy();
      const parsed = JSON.parse(stored!);
      expect(parsed.passengerRouteMap).toBe(true);
    });
  });
});
