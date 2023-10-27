import { configureStore } from "@reduxjs/toolkit";
// import reducers
import answersReducer from './components/Answers/answersSlice';
import answerReducer from './components/Answer/answerSlice';
import appReducer from './App/appSlice'

export default configureStore({
  reducer: {
        answers: answersReducer,
        answer: answerReducer,
        app: appReducer
    },
});