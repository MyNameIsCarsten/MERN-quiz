import { useSelector } from 'react-redux'
import './Question.css';

const Question = () => {
  const curQuestionIndex = useSelector((state) => state.app.currentQuestion)
  const curQuestion = useSelector((state) => state.quiz.data[curQuestionIndex].question)

  return (
    <div data-testid='question' className='question'>
        <p>{curQuestion}</p>
    </div>
  )
}

export default Question
