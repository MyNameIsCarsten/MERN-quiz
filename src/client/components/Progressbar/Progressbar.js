import './Progressbar.css';
import { nextQuestion, start } from '../../App/appSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toggleCompleted } from '../../App/appSlice';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Progressbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const hasSelected = useSelector((state) => state.app.hasSelected)
  const quiz = useSelector((state)=>state.quiz.data)
  const curQuestion = useSelector((state)=>state.app.currentQuestion)
  const isCompleted =  useSelector((state)=>state.app.isCompleted)
  const isStarted = useSelector((state)=> state.app.isStarted)
  const isLoggedIn = useSelector((state) => state.app.isLoggedIn);

  function clickHandler() {
    if(curQuestion + 1 <= quiz.length - 1){
      dispatch(nextQuestion());
    } else {
      dispatch(toggleCompleted());
    }
  }

  function startHandler() {
    dispatch(start());
    navigate('/');
  }

  function calculateProgress() {
    if (quiz && quiz.length) {
      const quizLength = quiz.length;
      const progress = (curQuestion + 1) / quizLength;
      return Math.round(progress * 100);
    }
    return 0; // Default progress when quiz is not available or empty
  }

  const style = {
    height: 12, 
    width: `${Math.max(calculateProgress(), 0)}%`
  }

  return (
    <div data-testid='progressbar'>
      {isStarted ? <footer>
        <div id='emptyProgress'></div>
        <div id='barContainer'>
          <div>{curQuestion + 1}/{quiz.length} Progressbar</div>
          <div className="light-grey" style={{ width:'10%'}}>
            <div className="grey" style={style}></div>
          </div>
        </div>
        
        <div id='buttonContainer'>
          <button data-testid='next' onClick={clickHandler} disabled={!hasSelected} style={{marginRight: 30}}>Next</button>
        </div>
      </footer>
      :
      <footer>
        <button onClick={startHandler} style={{ display: isLoggedIn ? 'block' : 'none' }}>
          <Link to='/'>{isCompleted ? 'Restart Quiz' : 'Start Quiz'}</Link>
        </button>
      </footer>  
      }
    </div>
  )
}

export default Progressbar
