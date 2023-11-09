import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '../../../setupTests';
import QuizForm from './QuizForm';
import reducer, { addQuestion, updateQuestion } from '../Quiz/quizSlice';
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



describe('QuizForm', () => {
    let mockReduxStore;

    beforeEach(() => {
        mockReduxStore = mockStore(initialState);
    })

    it('renders QuizForm', () => {
        render(
        <MemoryRouter> {/* necessary for const navigate = useNavigate(); */}
            <QuizForm />
        </MemoryRouter>
        );
        const linkElement = screen.getByTestId('quizform');
        expect(linkElement).toBeInTheDocument();
    });
    it('should handle updateQuestion action', async () => {
        const newQuestion = {
            'question': 'Is the World round?',
            'answers': {
                1: {
                    'answer': 'Yes',
                    'isCorrect': true
                },
                2: {
                    'answer': 'No',
                    isCorrect: false
                },
                3: {
                    'answer': 'Nope',
                    isCorrect: false
                },
                4: {
                    'answer': 'Ney',
                    isCorrect: false
                },
            }
        }
        // Create the payload for action
        const payload = newQuestion ;

        const expectedActions = [
            {
            type: 'quiz/update/pending',
            meta: { arg: payload, requestId: expect.any(String), requestStatus: 'pending' },
            },
            {
            type: 'quiz/update/fulfilled',
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
        await mockReduxStore.dispatch(updateQuestion(payload));

        // Ensure that the expected actions were dispatched
        const actions = mockReduxStore.getActions();
        expect(actions).toEqual(expectedActions);

        // Reset the fetch mock
        global.fetch.mockRestore();
    });
    it('should handle addQuestion action', async () => {
        const newQuestion = {
            'question': 'Is the World round?',
            'answers': {
                1: {
                    'answer': 'Yes',
                    'isCorrect': true
                },
                2: {
                    'answer': 'No',
                    isCorrect: false
                },
                3: {
                    'answer': 'Nope',
                    isCorrect: false
                },
                4: {
                    'answer': 'Ney',
                    isCorrect: false
                },
            }
        }
        // Create the payload for action
        const payload = newQuestion ;

        const expectedActions = [
            {
            type: 'quiz/add/pending',
            meta: { arg: payload, requestId: expect.any(String), requestStatus: 'pending' },
            },
            {
            type: 'quiz/add/fulfilled',
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
        await mockReduxStore.dispatch(addQuestion(payload));

        // Ensure that the expected actions were dispatched
        const actions = mockReduxStore.getActions();
        expect(actions).toEqual(expectedActions);

        // Reset the fetch mock
        global.fetch.mockRestore();
    });
});
