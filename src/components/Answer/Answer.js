import './Answer.css'

const Answer = ({ isCorrect, clickHandler, hasSelected }) => {


    return (
        <>
        {hasSelected ? 
            <button className={`answer ${isCorrect}`} data-testid='answer'>
                <p>Answer true</p>
            </button> 
            :
            <button className={`answer`} data-testid='answer' onClick={clickHandler}>
                <p>Answer true</p>
            </button> 
        }
        </>
        )
    
  
}

export default Answer
