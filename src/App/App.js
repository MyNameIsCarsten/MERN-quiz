import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../components/Navbar/Navbar';
import Progressbar from '../components/Progressbar/Progressbar';
import './App.css';
import Summary from '../components/Summary/Summary';
import { useEffect } from 'react';
import { fetchQuiz } from '../components/Quiz/quizSlice';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Quiz from '../components/Quiz/Quiz.js';
import QuizList from '../components/QuizList/QuizList';


function App() {
  const dispatch = useDispatch();
  const isCompleted = useSelector((state) => state.app.isCompleted)
  const isLoading = useSelector((state) => state.quiz.isLoading)
  const quiz = useSelector((state) => state.quiz.data)

  useEffect(()=> {
    dispatch(fetchQuiz())
  }, [dispatch])

  if(!isCompleted){
    return (
      <div className="App">
        <Router> {/* Wrap your entire app with the Router component */}
          <Navbar />
          {!isLoading && quiz.length > 0 ? (
            <div style={{ overflow: 'auto' }}>
              <Routes>
                <Route exact path="/" element={<Quiz/>} />
                <Route path="/quiz" element={<QuizList/>} />
              </Routes>
            </div>
          ) : (
            <p id="loading">Loading</p>
          )}
        </Router>
        <Progressbar />
      </div>
    );
  } else {
    return (
      <div className="App">
        <Router>
          <Navbar />
          <Summary />
        </Router>
      </div>
    );
  }

  
}

export default App;
