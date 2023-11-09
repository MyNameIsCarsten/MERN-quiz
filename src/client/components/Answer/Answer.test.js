import { Provider } from 'react-redux';
import { render, screen } from '../../../setupTests';
import Answer from './Answer';

// Import a mock store
import configureStore from 'redux-mock-store';

describe('Answer', () => {
  const initialState = {
    // Define your initial state here to match the structure of your Redux store
    app: {
      hasSelected: false,
    },
  };

  // Create a mock store
  const mockStore = configureStore([]);
  const store = mockStore(initialState);

  it('renders answer', () => {
    render(
      <Provider store={store}>
        <Answer />
      </Provider>
    );
    
    const linkElement = screen.getByTestId('answer');
    expect(linkElement).toBeInTheDocument();
  });
});
