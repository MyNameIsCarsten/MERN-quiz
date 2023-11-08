import { combineReducers  } from 'redux'
import { configureStore, getDefaultMiddleware  } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Defaults to localStorage
import thunk from 'redux-thunk';
// import reducers
import appReducer from './client/App/appSlice';
import quizReducer from './client/components/Quiz/quizSlice';
import settingsReducer from './client/components/Settings/settingsSlice';

const persistConfig = {
  key: "root", // Key to store the data in storage
  storage, // Specify localStorage or sessionStorage
  // You can add additional configuration options here if needed
  // whitelist: ['quiz'], // Specify which reducers to persist
};

const rootReducer = combineReducers({
  app: appReducer,
  quiz: quizReducer,
  settings: settingsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleware = [...getDefaultMiddleware(), thunk];

export const store = configureStore({
  reducer: persistedReducer, // Use the persistedReducer
  middleware
});

export const persistor = persistStore(store); // Create the persistor