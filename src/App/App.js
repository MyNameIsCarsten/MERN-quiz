import { useDispatch, useSelector } from 'react-redux';
import Answers from '../components/Answers/Answers';
import Navbar from '../components/Navbar/Navbar';
import Progressbar from '../components/Progressbar/Progressbar';
import Question from '../components/Question/Question';
import './App.css';
import Summary from '../components/Summary/Summary';
import { useEffect } from 'react';
import { fetchQuiz } from '../components/Quiz/quizSlice';

function App() {
  const dispatch = useDispatch();
  const isCompleted = useSelector((state) => state.app.isCompleted)
  const isError = useSelector((state) => state.quiz.isError)
  const quiz = useSelector((state) => state.quiz.data)

  useEffect(()=> {
    dispatch(fetchQuiz())
  }, [dispatch])

  if(!isCompleted){
    return (
      <div className="App">
        <Navbar />
        {!isError && quiz.length > 0 ? 
          <div style={{overflow: 'auto'}}>
            <Question />
            <Answers />
          </div>
          :
          <p id='loading'>Loading</p>
        }
        <Progressbar />
      </div>
    );
  } else {
    return (
      <div className="App">
        <Navbar />
        <Summary />
      </div>
    );
  }

  
}

export default App;
