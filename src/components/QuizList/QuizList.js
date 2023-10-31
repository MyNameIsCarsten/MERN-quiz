import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import '../Question/Question.css';
import { deleteQuestion, fetchQuiz } from '../Quiz/quizSlice';

const QuizList = () => {
    const dispatch = useDispatch();
    const questions = useSelector((state) => state.quiz.data);

    const handleDelete = async (id) =>{
        try {
            const result = await dispatch(deleteQuestion(id));

            if(deleteQuestion.fulfilled.match(result)){
                dispatch(fetchQuiz());
            }
        } catch (error){
            throw new Error ('Could not delete Question')
        } 
    };

  return (
    <div>
        <h2 id='questionList'>Question List:</h2>
      {Object.keys(questions).map((q, i) => 
        <div key={i} className='questionCard'>
            <p className='question'>{questions[q].question}</p>
            <div className='questionControls'>
                <p>Edit</p>
                <button onClick={() => handleDelete(i)}>Delete</button>
            </div>     
        </div>
        )}
    </div>
  )
}

export default QuizList
