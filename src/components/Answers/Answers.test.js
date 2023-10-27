import { render, screen, fireEvent } from '../../setupTests';
// npm install redux-mock-store
import configureStore from 'redux-mock-store';
import Answers from './Answers';
import { toggleSelected } from '../Answer/answerSlice';
import userEvent from '@testing-library/user-event'

const mockStore = configureStore([]);

const initialState = {
  answer: {
    hasSelected: false,
  },
};

// Create a mock store
const store = mockStore(initialState);


test('renders navbar', () => {
  render(<Answers />);
  const linkElement = screen.getByTestId('answers');
  expect(linkElement).toBeInTheDocument();
});

describe('Answers Component', () => {
  beforeEach(() => {
    store.clearActions()
  })

  it('should change state from false to true on click', () => {

    // Render component
    render(<Answers />);

    // Check that the initial state is false
    expect(store.getState().answer.hasSelected).toBe(false);

    // Simulate a click event
    userEvent.click(screen.getByTestId('answers'))
    
    // Dispatch the action manually into mock store
    store.dispatch(toggleSelected());

    // Check that the correct action type and payload are returned 
    expect(store.getActions()).toEqual([{ type: 'answer/toggleSelected', payload: undefined }])

  });
});