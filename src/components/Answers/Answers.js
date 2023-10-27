import './Answers.css'
import Answer from '../Answer/Answer'
import { useDispatch, useSelector } from 'react-redux';
import { toggleSelected } from '../../App/appSlice';
import { selectAnswer, updateUserIsRight } from '../../App/appSlice';

const Answers = () => {
    const curQuestion = useSelector((state) => state.app.currentQuestion);
    const answers = useSelector((state) => state.quiz);
    const curAnswers = answers[curQuestion].answers
    const dispatch = useDispatch();
  
    function clickHandler(e) {
        // user has made a choice
        dispatch(toggleSelected());
        // selected answer of user
        dispatch(selectAnswer(parseInt(e.target.name)))
        // check if user was right
        dispatch(updateUserIsRight(curAnswers[e.target.name].isCorrect))
    }

  return (
    <div data-testid='answers' id='answers'>
      { Object.keys(curAnswers).map((a,i) => <Answer key={i} isCorrect={curAnswers[a].isCorrect} clickHandler={clickHandler} text={curAnswers[a].answer} answerId={a}/>)}
    </div>
  )
}

export default Answers
