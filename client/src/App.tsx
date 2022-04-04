import { ClientContext, ErrorsContext } from '@logux/client/react'
import { Router, Route } from 'wouter'
import { useStore } from '@nanostores/react'

import './styles/theme.css'
import './styles/base.css'

import { AccessDeniedPage } from './pages/AccessDeniedPage.js'
import { AuthPage } from './pages/AuthPage.js'
import { ErrorPage } from './pages/ErrorPage.js'
import { LogoutPage } from './pages/Logout.js'
import { MainPage } from './pages/MainPage.js'
import { NotFoundPage } from './pages/NotFoundPage.js'
import { Layout } from './components/Layout/Layout.js'
import { clientStore } from './stores/logux-client.js'

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
