import { ClientContext, ErrorsContext } from '@logux/client/react'
import { Router, Route } from 'wouter'
import { useStore } from '@nanostores/react'

import './styles/theme.css'
import './styles/base.css'

import { Layout } from './components/Layout/Layout'
import { clientStore } from './stores/logux-client'
import { MainPage } from './pages/MainPage'
import { AccessDeniedPage } from './pages/AccessDeniedPage'
import { ErrorPage } from './pages/ErrorPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { AuthPage } from './pages/AuthPage'
import { LogoutPage } from './pages/Logout'

const errorPages = {
  NotFound: NotFoundPage,
  AccessDenied: AccessDeniedPage,
  Error: ErrorPage
}

export const App = (): JSX.Element => {
  let client = useStore(clientStore)

  return (
    <ErrorsContext.Provider value={errorPages}>
      <ClientContext.Provider value={client}>
        <Router>
          <Layout>
            <Route path="/">
              <MainPage />
            </Route>
            <Route path="/auth">
              <AuthPage />
            </Route>
            <Route path="/logout">
              <LogoutPage />
            </Route>
          </Layout>
        </Router>
      </ClientContext.Provider>
    </ErrorsContext.Provider>
  )
}
