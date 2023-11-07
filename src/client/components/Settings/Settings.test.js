import React from 'react';
import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import store from '../../../store';
import Settings from './Settings';
import reducer, { toggleRandomize} from './settingsSlice';
import { MemoryRouter } from 'react-router';

const initialState = {
    randomize: false
  };


describe('Settings', () => {
    it('should return initial state', () => {
        expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });
    it('renders settings', () => {
        render(
        <Provider store={store}>
            <MemoryRouter>
                <Settings />
            </MemoryRouter>
          </Provider>
          );
        const linkElement = screen.getByTestId('settings');
        expect(linkElement).toBeInTheDocument();
    });
    it('should handle toggleRandomize action', () => {
  
        // Create the action
        const action = toggleRandomize();
    
        const nextState = reducer(initialState, action);
    
        // Define the expected state after the action
        const expectedState = {
          ...initialState,
          randomize: true,
        };
        expect(nextState).toEqual(expectedState);
      });
});