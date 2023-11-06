import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../components/Navbar/Navbar';
import Progressbar from '../components/Progressbar/Progressbar';
import './App.css';
import Summary from '../components/Summary/Summary';
import { useEffect } from 'react';
import { fetchQuiz } from '../components/Quiz/quizSlice';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Quiz from '../components/Quiz/quiz.js';
import QuizList from '../components/QuizList/QuizList';
import QuizForm from '../components/QuizForm/QuizForm';
import Login from '../components/Login/Login.js';


function App() {
  const dispatch = useDispatch();
  const isCompleted = useSelector((state) => state.app.isCompleted);
  const isLoggedIn = useSelector((state) => state.app.isLoggedIn);
  const isLoading = useSelector((state) => state.quiz.isLoading);
  const quiz = useSelector((state) => state.quiz.data)

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchQuiz());
    }
  }, [dispatch, isLoggedIn]);

  if(!isCompleted && isLoggedIn){
    return (
      <div className="App">
        <Router> {/* Wrap your entire app with the Router component */}
          <Navbar />
          {!isLoading && quiz.length > 0 ? (
            <div style={{ overflow: 'auto' }}>
              <Routes>
                <Route exact path="/" element={<Quiz/>} />
                <Route path="/quiz" element={<QuizList/>} />
                <Route path="/quiz/add" element={<QuizForm/>} />
                <Route path="/quiz/edit/:id" element={<QuizForm/>} />
                <Route
                  path="/login"
                  element={<Navigate to="/" />}
                />
              </Routes>
            </div>
          ) : (
            <p id="loading">Loading</p>
          )}
        <Progressbar />
        </Router>
        
      </div>
    );
  } else if (!isLoggedIn) {
    return (
      <div className="App">
        <Router> {/* Wrap your entire app with the Router component */}
          <Navbar />
            <div style={{ overflow: 'auto' }}>
              <Routes>
                <Route exact path="/" element={<Login/>} />
                <Route path='/login' element={<Login />} />
                <Route
                  path="/*"
                  element={
                    isLoading && quiz.length === 0 ? (
                      <p id="loading">Loading</p>
                    ) : (
                      <Navigate to="/login" />
                    )
                  }
                />
              </Routes>
            </div>
        <Progressbar />
        </Router>
        
      </div>
    );
  }else {
    return (
      <div className="App">
        <Router>
          <Navbar />
          <Routes>
              <Route exact path="/" element={<Summary />} />
              <Route path="/quiz" element={<QuizList/>} />
              <Route path="/quiz/add" element={<QuizForm/>} />
              <Route path="/quiz/edit/:id" element={<QuizForm/>} />
            </Routes>
            <Progressbar />
        </Router>
        
      </div>
    );
  }

  
}

export default App;
