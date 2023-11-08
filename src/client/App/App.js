import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { lazy, Suspense, useEffect } from 'react';
import { fetchQuiz } from '../components/Quiz/quizSlice';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import Navbar from '../components/Navbar/Navbar';
// import Summary from '../components/Summary/Summary';
// import Quiz from '../components/Quiz/quiz.js';
// import QuizList from '../components/QuizList/QuizList';
// import QuizForm from '../components/QuizForm/QuizForm';
import Login from '../components/Login/Login.js';
// import Progressbar from '../components/Progressbar/Progressbar';
const Progressbar = lazy(() => import('../components/Progressbar/Progressbar'));
const Summary = lazy(() => import('../components/Summary/Summary'));
const Quiz = lazy(() => import('../components/Quiz/quiz'));
const QuizList = lazy(() => import('../components/QuizList/QuizList'));
const QuizForm = lazy(() => import('../components/QuizForm/QuizForm'));
const Settings = lazy(() => import('../components/Settings/Settings'));


function App() {
  const dispatch = useDispatch();
  const isCompleted = useSelector((state) => state.app.isCompleted);
  const userId = useSelector((state) => state.app.userId);
  const isLoggedIn = useSelector((state) => state.app.isLoggedIn);
  const isLoading = useSelector((state) => state.quiz.isLoading);
  const quiz = useSelector((state) => state.quiz.data)

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchQuiz({id : userId}));
    } 
  }, [dispatch, isLoggedIn, userId]);

  if(!isCompleted && isLoggedIn){
    return (
      <div className="App">
        <Router> {/* Wrap your entire app with the Router component */}
          <Navbar data-testid='navbar' />
          {!isLoading  ? (
            <div style={{ overflow: 'auto' }}>
              <Routes>


                  <Route exact path="/" element={
                    <Suspense fallback={<div style={{ display:'flex', justifyContent:'center' }}>Loading...</div>}>
                      <Quiz />
                    </Suspense>
                  } />
                  <Route path="/quiz" element={
                    <Suspense fallback={<div style={{ display:'flex', justifyContent:'center' }}>Loading...</div>}>
                      <QuizList />
                    </Suspense>
                  } />
                  <Route path="/quiz/add" element={
                    <Suspense fallback={<div style={{ display:'flex', justifyContent:'center' }}>Loading...</div>}>
                      <QuizForm />
                    </Suspense>
                  } />
                  <Route path="/quiz/edit/:id" element={
                    <Suspense fallback={<div style={{ display:'flex', justifyContent:'center' }}>Loading...</div>}>
                      <QuizForm />
                    </Suspense>
                  } />
                  <Route path="/login" element={
                    <Suspense fallback={<div style={{ display:'flex', justifyContent:'center' }}>Loading...</div>}>
                      <Navigate to="/" />
                    </Suspense>
                  } />
                  <Route path="/settings" element={
                    <Suspense fallback={<div style={{ display:'flex', justifyContent:'center' }}>Loading...</div>}>
                      <Settings />
                    </Suspense>
                  } />
              </Routes>
            </div>
          ) : (
            <p id="loading">Loading</p>
          )}
        <Suspense fallback={<div style={{ display:'flex', justifyContent:'center' }}>Loading...</div>}>
          <Progressbar />
        </Suspense>
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
              <Route exact path="/login" element={
                    <Suspense fallback={<div style={{ display:'flex', justifyContent:'center' }}>Loading...</div>}>
                      <Login />
                    </Suspense>
                  } />
                <Route path="/" element={
                    <Suspense fallback={<div style={{ display:'flex', justifyContent:'center' }}>Loading...</div>}>
                      <Navigate to="/login" />
                    </Suspense>
                  } />
                <Route
                  path="/*"
                  element={
                    isLoading && quiz.length === 0 ? (
                      <p id="loading">Loading</p>
                    ) : (
                      <Suspense fallback={<div style={{ display:'flex', justifyContent:'center' }}>Loading...</div>}>
                        <Navigate to="/" />
                      </Suspense>
                    )
                  }
                />
              </Routes>
            </div>
        <Suspense fallback={<div style={{ display:'flex', justifyContent:'center' }}>Loading...</div>}>
          <Progressbar />
        </Suspense>
        </Router>
        
      </div>
    );
  }else {
    return (
      <div className="App">
        <Router>
          <Navbar />
          <Routes>
              
              <Route exact path="/" element={
                <Suspense fallback={<div style={{ display:'flex', justifyContent:'center' }}>Loading...</div>}>
                  <Summary />
                </Suspense>
              } />
              
              <Route path="/quiz" element={
                    <Suspense fallback={<div style={{ display:'flex', justifyContent:'center' }}>Loading...</div>}>
                      <QuizList />
                    </Suspense>
                  } />
              <Route path="/quiz/add" element={
                    <Suspense fallback={<div style={{ display:'flex', justifyContent:'center' }}>Loading...</div>}>
                      <QuizForm />
                    </Suspense>
                  } />
              <Route path="/quiz/edit/:id" element={
                    <Suspense fallback={<div style={{ display:'flex', justifyContent:'center' }}>Loading...</div>}>
                      <QuizForm />
                    </Suspense>
              } />
              <Route path="/settings" element={
                    <Suspense fallback={<div style={{ display:'flex', justifyContent:'center' }}>Loading...</div>}>
                      <Settings />
                    </Suspense>
              } />
            </Routes>
            <Suspense fallback={<div style={{ display:'flex', justifyContent:'center' }}>Loading...</div>}>
              <Progressbar />
            </Suspense>
        </Router>
        
      </div>
    );
  }

  
}

export default App;
