import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import reducer from './reducers'
import { CrossTabClient, badge, badgeEn, log } from '@logux/client'
import { badgeStyles } from '@logux/client/badge/styles'
import { createStoreCreator } from '@logux/redux'

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const client = new CrossTabClient({
  server: 'ws://localhost:31337',
  subprotocol: '1.0.0',
  userId: 'anonymous', 
  token: '' 
})

const createStore = createStoreCreator(client)

const store = createStore(reducer, {}, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

store.client.start()

badge(store.client, { messages: badgeEn, styles: badgeStyles })
log(store.client)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
