import React from 'react'
import { useStore } from '@nanostores/react'
import { redirectPage } from '@nanostores/router'

import { MainPage } from '../../pages/MainPage.js'
import { LoginPage } from '../../pages/LoginPage.js'
import { LogoutPage } from '../../pages/LogoutPage.js'
import { NotFoundPage } from '../../pages/NotFoundPage.js'
import { router } from '../../stores/router.js'
import { authStore } from '../../stores/auth.js'

const Routes = (): JSX.Element | null => {
  const page = useStore(router)
  const { id: userId } = useStore(authStore)

  if (!page) {
    return <NotFoundPage />
  }

  if (!userId) {
    redirectPage(router, 'login')
  } else if (page.route === 'login') {
    redirectPage(router, 'main')
  }

  switch (page.route) {
    case 'login':
      return <LoginPage />
    case 'main':
      return <MainPage />
    case 'logout':
      return <LogoutPage />
  }

  return null
}

export default Routes
