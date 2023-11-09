import React from 'react';
import { render, screen } from '../../../setupTests';
import { Provider } from 'react-redux';
import Login from './Login';
import { MemoryRouter } from 'react-router';
import configureStore from 'redux-mock-store';
import reducer, { login }  from '../../App/appSlice';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initialState = {
      app: {
        user:null,
        userId: null,
      }
  };

  
describe('Login', () => {
    let mockReduxStore;

    beforeEach(() => {
      mockReduxStore = mockStore(initialState);
    })

    it('renders Login', () => {
        render(
        <Provider store={mockReduxStore}>
            <MemoryRouter>
                <Login />
            </MemoryRouter>
          </Provider>
          );
        const linkElement = screen.getByTestId('login');
        expect(linkElement).toBeInTheDocument();
    });

    it('should handle login action', async () => {
        // Create the payload for action
        const payload = { username: 'Carsten', password: 'yourPasswordHere' } ;

        const expectedActions = [
            {
              type: 'app/login/pending',
              meta: { arg: payload, requestId: expect.any(String), requestStatus: 'pending' },
            },
            {
              type: 'app/login/fulfilled',
              payload: { _id: 1 },
              meta: { arg: payload, requestId: expect.any(String), requestStatus: 'fulfilled' },
            },
          ];
        
          // Mock the API call for the login action
          jest.spyOn(global, 'fetch').mockImplementationOnce(() =>
            Promise.resolve({
              ok: true,
              json: () => Promise.resolve({ _id: 1 }),
            })
          );
  
        // Dispatch the login action
        await mockReduxStore.dispatch(login(payload));

        // Ensure that the expected actions were dispatched
        const actions = mockReduxStore.getActions();
        expect(actions).toEqual(expectedActions);

        // Reset the fetch mock
        global.fetch.mockRestore();
      });
});