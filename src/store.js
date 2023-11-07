import { configureStore, getDefaultMiddleware  } from "@reduxjs/toolkit";
import thunk from 'redux-thunk';
// import reducers
import appReducer from './client/App/appSlice';
import quizReducer from './client/components/Quiz/quizSlice';
import settingsReducer from './client/components/Settings/settingsSlice';

const middleware = [...getDefaultMiddleware(), thunk];

export default configureStore({
  reducer: {
        app: appReducer,
        quiz: quizReducer,
        settings: settingsReducer
    },
    middleware
});