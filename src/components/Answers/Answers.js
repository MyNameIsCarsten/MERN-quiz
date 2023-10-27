import './Answers.css'
import Answer from '../Answer/Answer'
import { useDispatch, useSelector } from 'react-redux';
import { toggleSelected } from '../Answer/answerSlice';

const Answers = () => {

    const answers = useSelector((state) => state.answers);
    const curAnswers = answers[0].answers
    const dispatch = useDispatch();
  
    function clickHandler(e) {
        dispatch(toggleSelected());
    }

  return (
    <div data-testid='answers' id='answers'>
      { Object.keys(curAnswers).map((a,i) => <Answer key={i} isCorrect={curAnswers[a].isCorrect} clickHandler={clickHandler} text={curAnswers[a].answer}/>)}
    </div>
  )
}

export default Answers
