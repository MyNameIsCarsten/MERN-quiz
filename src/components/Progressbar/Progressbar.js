import './Progressbar.css';
import { nextQuestion } from '../../App/appSlice';
import { useDispatch, useSelector } from 'react-redux';

const Progressbar = () => {
  const dispatch = useDispatch();
  const hasSelected = useSelector((state) => state.app.hasSelected)
  const quiz = useSelector((state)=>state.quiz)
  const curQuestion = useSelector((state)=>state.app.currentQuestion)
  const correctAnswers = useSelector((state)=>state.app.correctAnswers)
  const totalAnswers = useSelector((state)=>state.app.totalAnswers)

  function clickHandler() {
    if(curQuestion + 1 <= quiz.length - 1){
      dispatch(nextQuestion());
    }
  }

  function calculateProgress() {
    const quizLength = quiz.length;
    let progress = (curQuestion + 1 ) / quizLength
    progress = Math.round(progress * 100)
    console.log('Progress: ', progress)
    return progress;
  }

  const style = {
    height: 12, 
    width: `${Math.max(calculateProgress(), 0)}%`
  }

  calculateProgress();

  return (
    <div data-testid='progressbar'>
      <footer>
        <div id='emptyProgress'></div>
        <div id='barContainer'>
          <div>{curQuestion + 1}/{quiz.length} Progressbar</div>
          <div className="light-grey" style={{ width:'10%'}}>
            <div className="grey" style={style}></div>
          </div>
        </div>
        
        <div id='buttonContainer'>
          <button data-testid='next' onClick={clickHandler} disabled={!hasSelected}>Next</button>
        </div>
      </footer>
    </div>
  )
}

export default Progressbar
