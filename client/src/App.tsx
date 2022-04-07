import { ClientContext, ErrorsContext } from '@logux/client/react'
import { useStore } from '@nanostores/react'

import './styles/theme.css'
import './styles/base.css'

import { AccessDeniedPage } from './pages/AccessDeniedPage.js'
import { ErrorPage } from './pages/ErrorPage.js'
import { NotFoundPage } from './pages/NotFoundPage.js'
import { Layout } from './components/Layout/Layout.js'
import Routes from './components/Routes/Routes.js'
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
        <Layout>
          <Routes />
        </Layout>
      </ClientContext.Provider>
    </ErrorsContext.Provider>
  )
}
