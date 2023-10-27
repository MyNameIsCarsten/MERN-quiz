import { configureStore } from "@reduxjs/toolkit";
// import reducers
import appReducer from './App/appSlice';
import quizReducer from './components/Quiz/quizSlice';

export default configureStore({
  reducer: {
        app: appReducer,
        quiz: quizReducer
    },
});