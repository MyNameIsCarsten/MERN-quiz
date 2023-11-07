import './Answers.css'
import Answer from '../Answer/Answer'
import { useDispatch, useSelector } from 'react-redux';
import { toggleSelected } from '../../App/appSlice';
import { selectAnswer, updateUserIsRight } from '../../App/appSlice';

const Answers = () => {
    const curQuestion = useSelector((state) => state.app.currentQuestion);
    const answers = useSelector((state) => state.quiz.data);
    const dispatch = useDispatch();
  
    function clickHandler(e) {
        // user has made a choice
        dispatch(toggleSelected());

        if(answers && answers[curQuestion]) {
          const curAnswers = answers[curQuestion].answers
          const selectedAnswer = parseInt(e.target.name);

          if (curAnswers && curAnswers[selectedAnswer]) {
            const isCorrect = curAnswers[selectedAnswer].isCorrect;
            // selected answer of user
            dispatch(selectAnswer(selectedAnswer));
            // check if user was right
            dispatch(updateUserIsRight(isCorrect));
          }
        }
    }

  return (
    <div data-testid="answers" id="answers">
      {answers && answers[curQuestion] && answers[curQuestion].answers
        ? Object.keys(answers[curQuestion].answers).map((a, i) => (
            <Answer
              key={i}
              isCorrect={answers[curQuestion].answers[a].isCorrect}
              clickHandler={clickHandler}
              text={answers[curQuestion].answers[a].answer}
              answerId={a}
            />
          ))
        : null}
    </div>
  )
}

export default Answers
