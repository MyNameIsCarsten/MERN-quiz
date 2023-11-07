import { configureStore } from "@reduxjs/toolkit";
// import reducers
import appReducer from './client/App/appSlice';
import quizReducer from './client/components/Quiz/quizSlice';

export default configureStore({
  reducer: {
        app: appReducer,
        quiz: quizReducer
    },
});