import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { Settings } from './Settings';
import { FeatureFlagProvider } from '../hooks/useFeatureFlags';

// Mock fetch
global.fetch = vi.fn();

const renderSettings = () => {
  return render(
    <BrowserRouter>
      <FeatureFlagProvider>
        <Settings />
      </FeatureFlagProvider>
    </BrowserRouter>
  );
};

describe('Settings Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render two feature flag switches', async () => {
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        passengerRouteMap: false,
        driverRouteMapPreview: false,
      }),
    });

    renderSettings();

    await waitFor(() => {
      expect(screen.getByText('Карта пасажира')).toBeTruthy();
      expect(screen.getByText('Превью водія')).toBeTruthy();
    });
  });

  it('should update UI when clicking switch', async () => {
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        passengerRouteMap: false,
        driverRouteMapPreview: false,
      }),
    });

    renderSettings();

    await waitFor(() => {
      expect(screen.getByText('Карта пасажира')).toBeTruthy();
    });

    // Find the switch input
    const switches = screen.getAllByRole('switch');
    expect(switches.length).toBe(2);

    const passengerSwitch = switches[0];

    // Initially OFF (not checked)
    expect(passengerSwitch).not.toBeChecked();

    // Click to toggle ON
    await userEvent.click(passengerSwitch);

    // Should be checked now
    await waitFor(() => {
      expect(passengerSwitch).toBeChecked();
    });
  });

  it('should show loading state initially', async () => {
    (global.fetch as any).mockImplementationOnce(
      () =>
        new Promise((resolve) =>
          setTimeout(
            () =>
              resolve({
                ok: true,
                json: async () => ({
                  passengerRouteMap: true,
                  driverRouteMapPreview: false,
                }),
              }),
            100
          )
        )
    );

    renderSettings();

    expect(screen.getByText('Завантаження налаштувань...')).toBeTruthy();

    await waitFor(() => {
      expect(screen.getByText('Карта пасажира')).toBeTruthy();
    });
  });

  it('should show error state when fetch fails', async () => {
    (global.fetch as any).mockRejectedValueOnce(new Error('Network error'));

    renderSettings();

    await waitFor(() => {
      expect(screen.getByText('Помилка завантаження')).toBeTruthy();
    });
  });

  it('should reset settings when clicking reset button', async () => {
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        passengerRouteMap: true,
        driverRouteMapPreview: true,
      }),
    });

    renderSettings();

    await waitFor(() => {
      expect(screen.getByText('Карта пасажира')).toBeTruthy();
    });

    const resetButton = screen.getByText('Скинути налаштування');
    expect(resetButton).toBeTruthy();

    await userEvent.click(resetButton);

    // After reset, flags should be default (false)
    const switches = screen.getAllByRole('switch');

    await waitFor(() => {
      expect(switches[0]).not.toBeChecked();
      expect(switches[1]).not.toBeChecked();
    });
  });
});
