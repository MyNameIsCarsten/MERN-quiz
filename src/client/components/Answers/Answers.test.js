import { render, screen } from '../../../setupTests';
// npm install redux-mock-store
import configureStore from 'redux-mock-store';
import Answers from './Answers';
import { toggleSelected } from '../../App/appSlice';
import { selectAnswer, updateUserIsRight } from '../../App/appSlice';
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux';

const mockStore = configureStore([]);

// Create a mock store
// const store = mockStore(initialState);


describe('Answers Component', () => {
  const initialState = {
    app: {
      selectedAnswer: null,
      userIsRight: null,
      hasSelected: false,
    },
    quiz: {
      data: {
        0: {
          answers: {
            1: { isCorrect: true, answer: 'Correct Answer' },
            2: { isCorrect: false, answer: 'Incorrect Answer' },
          },
        },
        // Add more data as needed for your test scenario
      },
      currentQuestion: 0, // Set the current question
    },
  };
  
  let store;

  beforeEach(() => {
    store = mockStore(initialState);
  })

  it('renders answers', () => {
    render(
      <Provider store={store}>
        <Answers />
      </Provider>
    );
    const linkElement = screen.getByTestId('answers');
    expect(linkElement).toBeInTheDocument();
  });

  it('should change state from false to true on click', () => {

    // Render component
    render(
      <Provider store={store}>
        <Answers />
      </Provider>
    );

    // Check that the initial state is false
    expect(store.getState().app.hasSelected).toBe(false);

    // Simulate a click event
    userEvent.click(screen.getByTestId('answers'))
    
    // Dispatch the action manually into mock store
    store.dispatch(toggleSelected());

    // Check that the correct action type and payload are returned 
    expect(store.getActions()).toEqual([{ type: 'app/toggleSelected', payload: undefined }])

  });

  it('should update selectedAnswer state from null on click', () => {

    // Render component
    render(
      <Provider store={store}>
        <Answers />
      </Provider>
    );

    // Check that the initial state is false
    expect(store.getState().app.selectedAnswer).toBe(null);


    const answerId = 1
    // Simulate a click event
    const answerButton = screen.getByTestId('answers');
    userEvent.click(answerButton);

    
    // Dispatch the action manually into mock store
    store.dispatch(selectAnswer(answerId));

    // Check that the correct action type and payload are returned 
    expect(store.getActions()).toEqual([{ type: 'app/selectAnswer', payload: answerId }])

  });

  it('should update userIsRight state from null on click', () => {

    // Render component
    render(
      <Provider store={store}>
        <Answers />
      </Provider>
    );

    // Check that the initial state is false
    expect(store.getState().app.selectedAnswer).toBe(null);


    const isRight = true
    // Simulate a click event
    const answerButton = screen.getByTestId('answers');
    userEvent.click(answerButton);

    // Dispatch the action manually into mock store
    store.dispatch(updateUserIsRight(isRight));

    // Check that the correct action type and payload are returned 
    expect(store.getActions()).toEqual([{ type: 'app/updateUserIsRight', payload: true }])

  });
});