import React from 'react'
import { useSelector } from 'react-redux'

const Question = () => {
  const curQuestionIndex = useSelector((state) => state.app.currentQuestion)
  const curQuestion = useSelector((state) => state.quiz[curQuestionIndex].question)

  return (
    <div data-testid='question' id='question'>
        <p>{curQuestion}</p>
    </div>
  )
}

export default Question
