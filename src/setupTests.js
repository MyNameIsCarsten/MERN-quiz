// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import store from './store'; // Import your Redux store
import { render } from '@testing-library/react';

const customRender = (ui, options) =>
  render(ui, 
    { wrapper: (
        { children }) => <Provider store={store}>{children}</Provider>, ...options }
        );

// Re-export everything
export * from '@testing-library/react';

// Override render method
export { customRender as render };