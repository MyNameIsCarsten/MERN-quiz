import './Answers.css'
import Answer from '../Answer/Answer'
import { useState } from 'react'

const Answers = () => {

    const [ hasSelected, setHasSelected ] = useState(false);


    function clickHandler(e) {
        console.log(e.target.getAttribute("class"))
        setHasSelected(true)
        
    }

  return (
    <div data-testid='answers' id='answers'>
      <Answer isCorrect={true} clickHandler={clickHandler} hasSelected={hasSelected}/>
      <Answer isCorrect={false} clickHandler={clickHandler} hasSelected={hasSelected}/>
      <Answer isCorrect={false} clickHandler={clickHandler} hasSelected={hasSelected}/>
      <Answer isCorrect={false} clickHandler={clickHandler} hasSelected={hasSelected}/>
    </div>
  )
}

export default Answers
