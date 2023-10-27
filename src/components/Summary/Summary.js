import './Summary.css';
import { reset } from '../../App/appSlice';
import { useDispatch, useSelector } from 'react-redux';

const Summary = () => {
    const dispatch = useDispatch();
    const totalAnswers = useSelector((state)=>state.app.totalAnswers)
    const correctAnswers = useSelector((state)=>state.app.correctAnswers)
    console.log('totalAnswers: ', totalAnswers)
    console.log('correctAnswers: ', correctAnswers)

    const percent = Math.floor((correctAnswers / totalAnswers) * 100)
    console.log('Percent: ', percent)

    function clickHandler() {
        dispatch(reset());
    }

  return (
    <div data-testid='summary' id='summary'>
        <div id='summary-box'>
            <h1>Quiz Summary</h1>
            <div id='result-container'>
                <div id='left-container'>
                    <p id='percent'>{percent}%</p>
                </div>
                <div id='middle-container'>
                </div>
                <div id='right-container'>
                    <p className='summary-stats'><span>&#x2713;</span> {correctAnswers} correct</p>
                    <p className='summary-stats'><span>X</span> {totalAnswers - correctAnswers} incorrect</p>
                </div>
            </div>
        </div>
        <button id='restart' onClick={clickHandler}>
            Restart Quiz
        </button>
    </div>
  )
}

export default Summary
