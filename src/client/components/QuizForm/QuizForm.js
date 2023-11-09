import { useDispatch, useSelector } from 'react-redux';
import './QuizForm.css';
import { addQuestion, updateQuestion } from '../Quiz/quizSlice';
import { useNavigate, useParams } from 'react-router';
import {  useState } from 'react';

const QuizForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    let curQuestionIndex = 0;

    if(id !== undefined){
        curQuestionIndex = id
    }
    const quiz = useSelector((state) => state.quiz)

    let questionIndex;
    let answers;
    let curQuestion;

    if(id !== undefined ){
        questionIndex = quiz.data.findIndex((element) => element._id === curQuestionIndex)
        answers = quiz.data[questionIndex].answers
        curQuestion = quiz.data[questionIndex].question
    } 
    

    const [questionValue, setQuestionValue] = useState(id !== undefined ? curQuestion : '');
    const [answer1Value, setAnswer1Value] = useState(id !== undefined  ? answers[1].answer : '');
    const [isTrue1Value, setIsTrue1Value] = useState(id !== undefined  ? answers[1].isCorrect : false);
    const [answer2Value, setAnswer2Value] = useState(id !== undefined  ? answers[2].answer : '');
    const [isTrue2Value, setIsTrue2Value] = useState(id !== undefined  ? answers[2].isCorrect : false);
    const [answer3Value, setAnswer3Value] = useState(id !== undefined  ? answers[3].answer : '');
    const [isTrue3Value, setIsTrue3Value] = useState(id !== undefined  ? answers[3].isCorrect : false);
    const [answer4Value, setAnswer4Value] = useState(id !== undefined  ? answers[4].answer : '');
    const [isTrue4Value, setIsTrue4Value] = useState(id !== undefined  ? answers[4].isCorrect : false);

    const handleSubmit = (e) => {
        e.preventDefault();

        const isTrueArray = [isTrue1Value, isTrue2Value, isTrue3Value, isTrue4Value]
        const count = isTrueArray.filter((x) => x === true).length;

        if(count !==1) {
            alert('Only one answer can be true.')
        } else {
            const newQuestion = {
                'question': questionValue,
                'answers': {
                    1: {
                        'answer': answer1Value,
                        'isCorrect': isTrue1Value
                    },
                    2: {
                        'answer': answer2Value,
                        isCorrect: isTrue2Value
                    },
                    3: {
                        'answer': answer3Value,
                        isCorrect: isTrue3Value
                    },
                    4: {
                        'answer': answer4Value,
                        isCorrect: isTrue4Value
                    },
                }
            }
            try {
                if (id !== undefined) {
                    dispatch(updateQuestion({ id, arg: newQuestion }));
                } else {
                    dispatch(addQuestion(newQuestion));
                }
                navigate('/quiz');
            } catch (error) {
                // Handle errors, e.g., display an error message
                console.error('An error occurred:', error);
            }
        }
        
    };

  return (
    <div data-testid='quizform'>
        <h2>{id !== undefined ? 'Edit Question' : 'Add Question'}</h2>
        <form id="quizForm" onSubmit={handleSubmit}>
            <label htmlFor='question'>Question:</label>
            <textarea
                rows="4" 
                cols="50"
                id="question"
                value={questionValue}
                onChange={(e) => setQuestionValue(e.target.value)}
                />

            <div className='answerDiv'>
                <label htmlFor='answer1'>Answer 1:</label>
                <input 
                    type="text" 
                    id="answer1"  
                    value={answer1Value}
                    onChange={(e) => setAnswer1Value(e.target.value)} 
                    />
                <select name="1isTrue" id="1isTrue" value={isTrue1Value} onChange={(e) => setIsTrue1Value(e.target.value === 'true')}>
                    <option value="false">False</option>
                    <option value="true">True</option>
                </select>
            </div>

            <div className='answerDiv'>
                <label htmlFor='answer2'>Answer 2:</label>
                <input 
                    type="text" 
                    id="answer2"  
                    value={answer2Value}
                    onChange={(e) => setAnswer2Value(e.target.value)} 
                    />
                <select name="2isTrue" id="2isTrue" value={isTrue2Value} onChange={(e) => setIsTrue2Value(e.target.value === 'true')}>
                    <option value="false">False</option>
                    <option value="true">True</option>
                </select>
            </div>
            
            <div className='answerDiv'>
                <label htmlFor='answer3'>Answer 3:</label>
                <input 
                    type="text" 
                    id="answer3"  
                    value={answer3Value}
                    onChange={(e) => setAnswer3Value(e.target.value)} 
                    />
                <select name="3isTrue" id="3isTrue" value={isTrue3Value} onChange={(e) => setIsTrue3Value(e.target.value === 'true')}>
                    <option value="false">False</option>
                    <option value="true">True</option>
                </select>
            </div>

            <div className='answerDiv'>
                <label htmlFor='answer4'>Answer 4:</label>
                <input 
                    type="text" 
                    id="answer4"  
                    value={answer4Value}
                    onChange={(e) => setAnswer4Value(e.target.value)} 
                    />
                <select name="4isTrue" id="4isTrue" value={isTrue4Value} onChange={(e) => setIsTrue4Value(e.target.value === 'true')}>
                    <option value="false">False</option>
                    <option value="true">True</option>
                </select>
            </div>
            <div className='bttnDiv'>
                {id !== undefined ? (<button type="submit" id="backBttn" >Go Back</button>) : '' }
                <button type="submit" id="submitBttn" >Submit</button>
            </div>
        </form>
    </div>
  )
}

export default QuizForm
