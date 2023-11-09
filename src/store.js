import { combineReducers  } from 'redux'
import { configureStore  } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"; // Defaults to localStorage
// import reducers
import appReducer from './client/App/appSlice';
import quizReducer from './client/components/Quiz/quizSlice';
import settingsReducer from './client/components/Settings/settingsSlice';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'

const persistConfig = {
  key: "root", // Key to store the data in storage
  storage, // Specify localStorage or sessionStorage
  // You can add additional configuration options here if needed
  // whitelist: ['quiz'], // Specify which reducers to persist
};

export const rootReducer = combineReducers({
  app: appReducer,
  quiz: quizReducer,
  settings: settingsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer, // Use the persistedReducer
  middleware: getDefaultMiddleware =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

export const persistor = persistStore(store); // Create the persistor