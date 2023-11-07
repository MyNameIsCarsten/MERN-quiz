import { useSelector } from 'react-redux';
import './Question.css';

const Question = () => {
  const curQuestionIndex = useSelector((state) => state.app.currentQuestion);
  const quizData = useSelector((state) => state.quiz.data);

  if (!quizData || curQuestionIndex < 0 || curQuestionIndex >= quizData.length) {
    // Handle the case where data is not available or the index is out of range
    return (
      <div data-testid='question' className='question'>
        {/* You can display a message or component indicating an error or loading */}
        <p>Question data is not available or an error occurred.</p>
      </div>
    );
  }

  const curQuestion = quizData[curQuestionIndex].question;

  return (
    <div data-testid='question' className='question'>
      {curQuestion ? (
        <p>{curQuestion}</p>
      ) : null}
    </div>
  );
};

export default Question;
