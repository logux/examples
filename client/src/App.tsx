import { ClientContext, ErrorsContext } from '@logux/client/react'

import './styles/base.css'

import { MainPage } from './pages/MainPage'
import { AccessDeniedPage } from './pages/AccessDeniedPage'
import { ErrorPage } from './pages/ErrorPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { client } from './stores/sync-client'

const errorPages = {
  NotFound: NotFoundPage,
  AccessDenied: AccessDeniedPage,
  Error: ErrorPage
}

export const App = (): JSX.Element => {
  return (
    <ErrorsContext.Provider value={errorPages}>
      <ClientContext.Provider value={client}>
        <MainPage />
      </ClientContext.Provider>
    </ErrorsContext.Provider>
  )
}
