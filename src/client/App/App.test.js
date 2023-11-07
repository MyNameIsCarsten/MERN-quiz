import React from 'react';
import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import store from '../../store'; 
import App from './App';
import reducer, { selectAnswer, updateUserIsRight, nextQuestion, toggleSelected, toggleCompleted, reset, start} from './appSlice';

const initialState = {
  user: null,
  userId: null,
  isLoggedIn: false,
  isLoading: false,
  isError: false,
  hasSelected: false,
  selectedAnswer: null,
  currentQuestion: 0,
  userIsRight: null,
  correctAnswers: 0,
  totalAnswers: 0,
  isCompleted: false,
  isStarted: false,
  errorMessage: '',
};

describe('App', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle selectAnswer action', () => {
  
    // Create the action with payload
    const payload = 1 ;
    const action = selectAnswer(payload);

    const nextState = reducer(initialState, action);

    // Define the expected state after the action
    const expectedState = {
      ...initialState,
      totalAnswers: 1,
      selectedAnswer: 1
    };
    expect(nextState).toEqual(expectedState);
  });

  it('should handle updateUserIsRight action', () => {
  
    // Create the action with payload
    const payload = true ;
    const action = updateUserIsRight(payload);

    const nextState = reducer(initialState, action);

    // Define the expected state after the action
    const expectedState = {
      ...initialState,
      userIsRight: true,
      correctAnswers: 1
    };
    expect(nextState).toEqual(expectedState);
  });

  it('should handle nextQuestion action', () => {
  
    // Create the action
    const action = nextQuestion();

    const nextState = reducer(initialState, action);

    // Define the expected state after the action
    const expectedState = {
      ...initialState,
      currentQuestion: 1,
      hasSelected: false,
      userIsRight: null,
      selectedAnswer: null
    };
    expect(nextState).toEqual(expectedState);
  });

  it('should handle toggleSelected action', () => {
  
    // Create the action
    const action = toggleSelected();

    const nextState = reducer(initialState, action);

    // Define the expected state after the action
    const expectedState = {
      ...initialState,
      hasSelected: true,
    };
    expect(nextState).toEqual(expectedState);
  });

  it('should handle toggleCompleted action', () => {
  
    // Create the action
    const action = toggleCompleted();

    const nextState = reducer(initialState, action);

    // Define the expected state after the action
    const expectedState = {
      ...initialState,
      isCompleted: true,
      isStarted: false
    };
    expect(nextState).toEqual(expectedState);
  });

  it('should handle reset action', () => {
  
    // Create the action
    const action = reset();

    const nextState = reducer(initialState, action);

    // Define the expected state after the action
    const expectedState = {
      ...initialState,
    };
    expect(nextState).toEqual(expectedState);
  });

  it('should handle start action', () => {
  
    // Create the action
    const action = start();

    const nextState = reducer(initialState, action);

    // Define the expected state after the action
    const expectedState = {
      ...initialState,
      isCompleted: false,
      isStarted: true
    };
    expect(nextState).toEqual(expectedState);
  });

  it('renders navbar', async () => {
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

  it('renders progressbar', async () => {
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
});