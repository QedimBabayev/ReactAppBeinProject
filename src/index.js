import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux'
import './i18n'
import { PersistGate } from 'redux-persist/integration/react'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import reduxPromise from 'redux-promise-middleware'
import rootReducer from './reducers/rootReducer'
import { composeWithDevTools } from 'redux-devtools-extension'
import { persistStore } from 'redux-persist'
import  persistReducer  from './reducers/rootReducer'
export const store = createStore(
  persistReducer,
  composeWithDevTools(applyMiddleware(reduxPromise, thunk, logger))
);
const persistor = persistStore(store)



ReactDOM.render(
  <Provider store={store}>
    <Suspense fallback={<div>Loading...</div>}>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </Suspense>
  </Provider >,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
