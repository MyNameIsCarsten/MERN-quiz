import { render, screen } from '../../../setupTests';
import QuizList from './QuizList';
import reducer, { fetchQuiz } from '../Quiz/quizSlice';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initialState = {
      app: {
        user:null,
        userId: null,
      }
  };

describe('QuizList', () => {
    let mockReduxStore;

    beforeEach(() => {
        mockReduxStore = mockStore(initialState);
    })

  it('renders QuizList', () => {
    render(<QuizList />);
    const linkElement = screen.getByTestId('quizlist');
    expect(linkElement).toBeInTheDocument();
  });
  it('should handle fetchQuiz action', async () => {
    const expectedActions = [
        {
            // you can find this data in redux-dev tools under the 'action' tab
          type: 'quiz/fetch/pending',
          meta: {    
            requestId: expect.any(String), 
            requestStatus: 'pending', 
            arg: [{ id: '65462fccc53ca6d21c7c41be', shuffle: false }] },
        },
        {
          type: 'quiz/fetch/fulfilled',
          payload: [],
          meta: { 
            requestId: expect.any(String), 
            requestStatus: 'fulfilled', 
            arg: [{ id: '65462fccc53ca6d21c7c41be', shuffle: false }] },
        },
      ];
  
    // Mock the API call for the login action
    jest.spyOn(global, 'fetch').mockImplementationOnce(() =>
        Promise.resolve({
            ok: true,
            json: () => Promise.resolve([]), 
        })
    );
  
    // Dispatch the login action with the necessary argument
    await mockReduxStore.dispatch(fetchQuiz([{ id: '65462fccc53ca6d21c7c41be', shuffle: false }]));
  
    // Ensure that the expected actions were dispatched
    const actions = mockReduxStore.getActions();
    expect(actions).toEqual(expectedActions);
  
    // Reset the fetch mock
    global.fetch.mockRestore();
  });
  
});
