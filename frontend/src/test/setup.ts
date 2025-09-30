import '@testing-library/jest-dom';

// Мокаємо console.error для тестів
const originalConsoleError = console.error;
const originalConsoleWarn = console.warn;

console.error = vi.fn();
console.warn = vi.fn();

// Відновлюємо оригінальні функції після тестів
afterEach(() => {
  console.error = originalConsoleError;
  console.warn = originalConsoleWarn;
});

// Налаштування для AbortController
if (typeof AbortController === 'undefined') {
  // @ts-ignore
  global.AbortController = require('abort-controller');
}

// Налаштування для fetch
if (typeof fetch === 'undefined') {
  // @ts-ignore
  global.fetch = require('node-fetch');
}