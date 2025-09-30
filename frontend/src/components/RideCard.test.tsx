import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { RideCard } from './RideCard';
import { FeatureFlagProvider } from '../hooks/useFeatureFlags';
import type { Ride } from '../types';

// Mock fetch
global.fetch = vi.fn();

const mockRide: Ride = {
  id: 'r1',
  role: 'passenger',
  from: 'Kyiv',
  to: 'Lviv',
  when: '2025-09-27T08:30:00+03:00',
  coords: { lat: 50.4501, lng: 30.5234 },
};

describe('RideCard', () => {
  it('should show MapPlaceholder when passengerRouteMap flag is enabled', async () => {
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        passengerRouteMap: true,
        driverRouteMapPreview: false,
      }),
    });

    render(
      <FeatureFlagProvider>
        <RideCard ride={mockRide} />
      </FeatureFlagProvider>
    );

    // Wait for loading to finish
    await waitFor(() => {
      const kyivElements = screen.getAllByText('Kyiv');
      expect(kyivElements.length).toBeGreaterThan(0);
    });

    // Check that map placeholder is shown (coordinates visible)
    const mapPlaceholder = document.querySelector('.map-placeholder');
    expect(mapPlaceholder).toBeTruthy();

    // Check that "Map disabled" message is NOT shown
    const disabledMessage = screen.queryByText('Карта вимкнена');
    expect(disabledMessage).toBeNull();
  });

  it('should show MapDisabled when passengerRouteMap flag is disabled', async () => {
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        passengerRouteMap: false,
        driverRouteMapPreview: false,
      }),
    });

    render(
      <FeatureFlagProvider>
        <RideCard ride={mockRide} />
      </FeatureFlagProvider>
    );

    // Wait for loading to finish
    await waitFor(() => {
      const kyivElements = screen.getAllByText('Kyiv');
      expect(kyivElements.length).toBeGreaterThan(0);
    });

    // Check that "Map disabled" message is shown
    const disabledMessage = await screen.findByText('Карта вимкнена');
    expect(disabledMessage).toBeTruthy();

    // Check that map placeholder is NOT shown
    const mapPlaceholder = document.querySelector('.map-placeholder');
    expect(mapPlaceholder).toBeNull();
  });

  it('should show MapPlaceholder for driver role when driverRouteMapPreview is enabled', async () => {
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        passengerRouteMap: false,
        driverRouteMapPreview: true,
      }),
    });

    const driverRide: Ride = { ...mockRide, role: 'driver' };

    render(
      <FeatureFlagProvider>
        <RideCard ride={driverRide} />
      </FeatureFlagProvider>
    );

    await waitFor(() => {
      const kyivElements = screen.getAllByText('Kyiv');
      expect(kyivElements.length).toBeGreaterThan(0);
    });

    // Map should be shown for driver
    const mapPlaceholder = document.querySelector('.map-placeholder');
    expect(mapPlaceholder).toBeTruthy();

    // "Map disabled" should NOT be shown
    const disabledMessage = screen.queryByText('Карта вимкнена');
    expect(disabledMessage).toBeNull();
  });

  it('should display ride information correctly', async () => {
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        passengerRouteMap: true,
        driverRouteMapPreview: false,
      }),
    });

    render(
      <FeatureFlagProvider>
        <RideCard ride={mockRide} />
      </FeatureFlagProvider>
    );

    // Wait for component to load
    await waitFor(() => {
      const kyivElements = screen.getAllByText('Kyiv');
      expect(kyivElements.length).toBeGreaterThan(0);
    });

    // Check both cities are displayed
    expect(screen.getAllByText('Kyiv').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Lviv').length).toBeGreaterThan(0);
  });
});
