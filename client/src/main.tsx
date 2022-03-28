import React from 'react'
import ReactDOM from 'react-dom'
import { ClientContext } from '@logux/client/react'

import './index.css'
import App from './App'
import { client } from './stores/sync-client'

ReactDOM.render(
  <React.StrictMode>
    <ClientContext.Provider value={client}>
      <App />
    </ClientContext.Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
