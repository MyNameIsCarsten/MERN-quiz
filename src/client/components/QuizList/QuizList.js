import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import '../Question/Question.css';
import { deleteQuestion, fetchQuiz } from '../Quiz/quizSlice';
import { Link } from 'react-router-dom';

const QuizList = () => {
    const dispatch = useDispatch();
    const questions = useSelector((state) => state.quiz.data);
    const userId = useSelector((state) => state.app.userId);

    const handleDelete = async (id) =>{
        try {
            const result = await dispatch(deleteQuestion(id));

            if(deleteQuestion.fulfilled.match(result)){
                dispatch(fetchQuiz(userId));
            }
        } catch (error){
            throw new Error ('Could not delete Question')
        } 
    };

  return (
    <div style={{backgroundColor: '#10162F'}} data-testid='quizlist'>
        <h2 id='questionList'>Question List:</h2>
        {Object.keys(questions).map((q, i) => 
            <div key={i} className='questionCard'>
                <p className='question'>{questions[q].question}</p>
                <div className='questionControls'>
                    <button>
                        <Link to={`/quiz/edit/${questions[q]._id}`}>Edit</Link>
                    </button>
                    <button onClick={() => handleDelete(questions[q]._id)}>Delete</button>
                </div>     
            </div>
            )}
    </div>
  )
}

export default QuizList
