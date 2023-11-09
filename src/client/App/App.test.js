/* eslint-disable testing-library/no-unnecessary-act */
import React from 'react';
import { render, screen } from '../../setupTests';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import store from '../../store'; 
import App from './App';
import reducer, { selectAnswer, updateUserIsRight, nextQuestion, toggleSelected, toggleCompleted, reset, start} from './appSlice';
// Import a mock store
import configureStore from 'redux-mock-store';


const initialState = {
  app: {
    isCompleted: false,
  },
  quiz: {
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
  }
};

describe('App', () => {

  // Create a mock store
  const mockStore = configureStore([]);
  const store = mockStore(initialState);

  it('should return initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState.quiz);
  });

  it('should handle selectAnswer action', () => {
  
    // Create the action with payload
    const payload = 1 ;
    const action = selectAnswer(payload);

    const nextState = reducer(initialState.quiz, action);

    // Define the expected state after the action
    const expectedState = {
      ...initialState.quiz,
      totalAnswers: 1,
      selectedAnswer: 1
    };
    expect(nextState).toEqual(expectedState);
  });

  it('should handle updateUserIsRight action', () => {
  
    // Create the action with payload
    const payload = true ;
    const action = updateUserIsRight(payload);

    const nextState = reducer(initialState.quiz, action);

    // Define the expected state after the action
    const expectedState = {
      ...initialState.quiz,
      userIsRight: true,
      correctAnswers: 1
    };
    expect(nextState).toEqual(expectedState);
  });

  it('should handle nextQuestion action', () => {
  
    // Create the action
    const action = nextQuestion();

    const nextState = reducer(initialState.quiz, action);

    // Define the expected state after the action
    const expectedState = {
      ...initialState.quiz,
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

    const nextState = reducer(initialState.quiz, action);

    // Define the expected state after the action
    const expectedState = {
      ...initialState.quiz,
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
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const progressbarElement = screen.getByTestId('progressbar');
    expect(progressbarElement).toBeInTheDocument();
  });
});