// jest.setup.js

// In your own jest-setup.js (or any other name)
import '@testing-library/jest-dom/jest-globals'
import '@testing-library/jest-dom';

// Mock Next.js router (optional, if you're using `useRouter` in your tests)
jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '/',
      query: '',
      asPath: '/',
    };
  },
}));

// Suppress warnings or logs in tests (optional)
global.console.warn = jest.fn();
global.console.error = jest.fn();
