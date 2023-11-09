// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import store, { rootReducer } from './store'; // Import your Redux store
import { render } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';


const createMockStore = (initialState) => {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
    middleware: [thunk], // Include any middleware you use
  });
  return store;
};

const customRender = (ui, { initialState, ...options } = {}) => {
  const store = createMockStore(initialState); // Create a mock store with initialState
  return render(
    <Provider store={store}>
      {ui}
    </Provider>,
    options
  );
};

// Re-export everything
export * from '@testing-library/react';

// Override render method
export { customRender as render };