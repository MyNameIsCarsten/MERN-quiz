import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from '../src/client/App/App';
import  { store, persistor } from './store';
import { Provider } from "react-redux";
import reportWebVitals from './reportWebVitals';
import { PersistGate } from "redux-persist/integration/react";

const root = ReactDOM.createRoot(document.getElementById('root'));
const render = () => {
  root.render(
    <React.StrictMode>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <App
              state={store.getState()}
              dispatch={store.dispatch}
            />
          </PersistGate>
        </Provider>
      </React.StrictMode>
  )
}

render();

store.subscribe(render);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
