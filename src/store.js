import { configureStore } from "@reduxjs/toolkit";
// import reducers
import answersReducer from './components/Answers/answersSlice';
import answerReducer from './components/Answer/answerSlice';

export default configureStore({
  reducer: {
        answers: answersReducer,
        answer: answerReducer
    },
});