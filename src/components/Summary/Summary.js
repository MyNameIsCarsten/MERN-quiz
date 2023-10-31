import './Summary.css';
import { useSelector } from 'react-redux';

const Summary = () => {
    const totalAnswers = useSelector((state)=>state.app.totalAnswers)
    const correctAnswers = useSelector((state)=>state.app.correctAnswers)
    const percent = Math.floor((correctAnswers / totalAnswers) * 100)


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
    </div>
  )
}

export default Summary
