import { useSelector } from 'react-redux'
import './Answer.css'

const Answer = ({ isCorrect, clickHandler, text, answerId }) => {

    const hasSelected = useSelector((state) => state.answer.hasSelected);

    return (
        <>
        {hasSelected ? 
            <button className={`answer ${isCorrect}`} data-testid='answer' name={answerId}>
                <p>{text}</p>
            </button> 
            :
            <button className={`answer`} data-testid='answer' onClick={clickHandler} name={answerId}>
                <p>{text}</p>
            </button> 
        }
        </>
        )
    
  
}

export default Answer
