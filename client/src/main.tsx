import React from 'react'
import ReactDOM from 'react-dom'
import { ClientContext, ErrorsContext } from '@logux/client/react'

import './index.css'
import App from './App'
import { client } from './stores/sync-client'
import accessDenied from './pages/access-denied-page'
import error from './pages/error-page'
import notFound from './pages/not-found-page'

const errorHandlersPages = {
  NotFound: notFound,
  AccessDenied: accessDenied,
  Error: error
}

ReactDOM.render(
  <React.StrictMode>
    <ErrorsContext.Provider value={errorHandlersPages}>
      <ClientContext.Provider value={client}>
        <App />
      </ClientContext.Provider>
    </ErrorsContext.Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
