import React from 'react';
import { render, screen } from '../../../setupTests';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import store from '../../../store';
import Settings from './Settings';
import reducer, { toggleRandomize} from './settingsSlice';
import { MemoryRouter } from 'react-router';
import configureStore from 'redux-mock-store';

const mockStore = configureStore([]);

const initialState = {
      app: {
        userId: null
      }, 
      settings: {
        randomize: false
      }
  };


describe('Settings', () => {
    let mockReduxStore;

    beforeEach(() => {
      mockReduxStore = mockStore(initialState);
    })

    it('should return initial state', () => {
        expect(reducer(undefined, { type: 'unknown' })).toEqual({ "randomize": false });
    });

    it('renders settings', () => {
        render(
        <Provider store={mockReduxStore}>
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