import { useSelector } from 'react-redux'
import './Answer.css'

const Answer = ({ isCorrect, clickHandler, text }) => {

    const hasSelected = useSelector((state) => state.answer.hasSelected);

    return (
        <>
        {hasSelected ? 
            <button className={`answer ${isCorrect}`} data-testid='answer'>
                <p>{text}</p>
            </button> 
            :
            <button className={`answer`} data-testid='answer' onClick={clickHandler}>
                <p>{text}</p>
            </button> 
        }
        </>
        )
    
  
}

export default Answer
