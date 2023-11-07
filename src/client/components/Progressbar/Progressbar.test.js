// Import the necessary dependencies and modules

import { render, screen, waitFor } from '../../../setupTests';
import Progressbar from './Progressbar';
import { MemoryRouter } from 'react-router-dom';
import { useSelector } from 'react-redux'; 
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

// Import your actual reducers
import appReducer from '../../App/appSlice'; 
import quizReducer from '../../components/Quiz/quizSlice'; 

// Mock useSelector
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}));

describe('Progressbar', () => {
  // Configure the store using the actual reducers and initial state
  const mockStore = configureStore({
    reducer: {
      app: appReducer, // Use your actual appReducer
      quiz: quizReducer, // Use your actual quizReducer
    },
  });

  const renderWithRedux = (component) => {
    return {
      ...render(
        <Provider store={mockStore}>
          <MemoryRouter>{component}</MemoryRouter>
        </Provider>
      ),
    };
  };

  it('renders progressbar', () => {
    renderWithRedux(<Progressbar />);
    const linkElement = screen.getByTestId('progressbar');
    expect(linkElement).toBeInTheDocument();
  });

  it('renders Next button when isStarted is true', () => {
    useSelector.mockReturnValue(true);
    renderWithRedux(<Progressbar />);
    const nextButton = screen.queryByTestId('next');
    expect(nextButton).toBeInTheDocument();
  });

  it('does not render Next button when isStarted is false', () => {
    useSelector.mockReturnValue(false);
    renderWithRedux(<Progressbar />);
    const nextButton = screen.queryByTestId('next');
    expect(nextButton).toBeNull();
  });

  it('Next button is clickable when isStarted is true', async () => {
    // Set the isStarted value to true in the useSelector mock
    useSelector.mockReturnValue(true);
  
    renderWithRedux(<Progressbar />);
    await waitFor(() => {
      const linkElement = screen.getByTestId('next');
      expect(linkElement).not.toHaveAttribute('disabled'); // Check if the button is not disabled
    });
  });
});
