import React from 'react'
import Question from '../Question/Question';
import Answers from '../Answers/Answers';
import { useSelector } from 'react-redux';

const Quiz = () => {
  const isLoggedIn = useSelector((state) => state.app.isLoggedIn);
  const isStarted = useSelector((state)=> state.app.isStarted)

  return (
    <div data-testid='quiz'>
        {isLoggedIn && isStarted ? 
        (<>
          <Question />
          <Answers />
        </>)
        :
        <p style={{ display:'flex', justifyContent:'center' }}>Press the button to start the quiz.</p>}
    </div>
  )
}

export default Quiz;
