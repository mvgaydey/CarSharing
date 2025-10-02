import { List, Switch, NavBar, Button } from 'antd-mobile';
import { ErrorBlock as AntdErrorBlock } from 'antd-mobile';
import { useFeatureFlags } from '../hooks/useFeatureFlags';
import { LoadingSpinner } from '../components/LoadingSpinner';
import type { FeatureFlagKey } from '../types';
import { useNavigate } from 'react-router-dom';

export const Settings = () => {
  const { isEnabled, enable, disable, loading, error, reset } = useFeatureFlags();
  const navigate = useNavigate();

  const handleToggle = (key: FeatureFlagKey, checked: boolean) => {
    if (checked) {
      enable(key);
    } else {
      disable(key);
    }
  };

  if (loading) {
    return (
      <div className="settings-page">
        <NavBar onBack={() => navigate('/')} className="settings-navbar">
          Налаштування
        </NavBar>
        <LoadingSpinner message="Завантаження налаштувань..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="settings-page">
        <NavBar onBack={() => navigate('/')} className="settings-navbar">
          Налаштування
        </NavBar>
        <div className="error-container">
          <AntdErrorBlock
            status="default"
            title="Помилка завантаження"
            description={error}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="settings-page">
      <NavBar onBack={() => navigate('/')} className="settings-navbar">
        Налаштування
      </NavBar>
      <div className="settings-content">
        <div className="settings-list-container">
          <List
            header={<span className="settings-section-title">Feature Flags</span>}
            className="settings-list"
          >
            <List.Item
              className="settings-list-item"
              prefix={<span className="settings-item-icon">🗺️</span>}
              extra={
                <Switch
                  className="settings-switch"
                  checked={isEnabled('passengerRouteMap')}
                  onChange={(checked) => handleToggle('passengerRouteMap', checked)}
                  style={{
                    '--checked-color': 'var(--ridesafe-primary)',
                    '--height': '28px',
                    '--width': '54px',
                  } as React.CSSProperties}
                />
              }
            >
              <div className="setting-item-content">
                <p className="setting-title">Карта пасажира</p>
                <p className="setting-description">Показувати карту маршруту на сторінці пасажира</p>
              </div>
            </List.Item>
            <List.Item
              className="settings-list-item"
              prefix={<span className="settings-item-icon">🚗</span>}
              extra={
                <Switch
                  className="settings-switch"
                  checked={isEnabled('driverRouteMapPreview')}
                  onChange={(checked) => handleToggle('driverRouteMapPreview', checked)}
                  style={{
                    '--checked-color': 'var(--ridesafe-primary)',
                    '--height': '28px',
                    '--width': '54px',
                  } as React.CSSProperties}
                />
              }
            >
              <div className="setting-item-content">
                <p className="setting-title">Превью водія</p>
                <p className="setting-description">Показувати попередній перегляд карти для водія</p>
              </div>
            </List.Item>
            <List.Item
              className="settings-list-item"
              prefix={<span className="settings-item-icon">⚙️</span>}
              extra={
                <Switch
                  className="settings-switch"
                  checked={isEnabled('showSettings')}
                  onChange={(checked) => handleToggle('showSettings', checked)}
                  style={{
                    '--checked-color': 'var(--ridesafe-primary)',
                    '--height': '28px',
                    '--width': '54px',
                  } as React.CSSProperties}
                />
              }
            >
              <div className="setting-item-content">
                <p className="setting-title">Показувати налаштування</p>
                <p className="setting-description">Показувати кнопку налаштування</p>
              </div>
            </List.Item>
          </List>
          <div className="settings-controls">
            <Button
              className="reset-button"
              onClick={reset}
              color="danger"
              size="small"
              fill="outline"
            >
              Скинути налаштування
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;