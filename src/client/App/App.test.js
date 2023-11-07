import React from 'react';
import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import store from '../../store'; 
import App from './App';

test('renders navbar', async () => {
  await act(async () => { 
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
  });

  const navbarElement = screen.getByTestId('navbar');
  expect(navbarElement).toBeInTheDocument();
});

test('renders progressbar', async () => {
  await act(async () => { 
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
  });
  const progressbarElement = screen.getByTestId('progressbar');
  expect(progressbarElement).toBeInTheDocument();
});
