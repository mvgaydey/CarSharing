import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FeatureFlagProvider } from './hooks/useFeatureFlags';
import { ErrorBoundary } from './components/ErrorBoundary';
import Home from './pages/Home';
import Settings from './pages/Settings';
import Passenger from './pages/Passenger';
import Driver from './pages/Driver';
import './App.css';

function App() {
  return (
    <ErrorBoundary>
      <FeatureFlagProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/passenger" element={<Passenger />} />
            <Route path="/driver" element={<Driver />} />
          </Routes>
        </BrowserRouter>
      </FeatureFlagProvider>
    </ErrorBoundary>
  );
}

export default App;