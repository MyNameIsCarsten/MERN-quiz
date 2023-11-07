import { configureStore } from "@reduxjs/toolkit";
// import reducers
import appReducer from './client/App/appSlice';
import quizReducer from './client/components/Quiz/quizSlice';
import settingsReducer from './client/components/Settings/settingsSlice';

export default configureStore({
  reducer: {
        app: appReducer,
        quiz: quizReducer,
        settings: settingsReducer
    },
});