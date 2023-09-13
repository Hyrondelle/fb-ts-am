import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.scss'
import { Provider } from 'react-redux'
import { createStore,applyMiddleware } from 'redux'

import thunk from 'redux-thunk'
import rootReducer from './reducers'

import { composeWithDevTools } from 'redux-devtools-extension'
import logger from 'redux-logger'

const store = createStore(
  rootReducer,composeWithDevTools(applyMiddleware(thunk,logger))
)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store ={store}>
    <App />
    </Provider>
  </React.StrictMode>
)
