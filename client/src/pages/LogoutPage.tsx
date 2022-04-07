import { useStore } from '@nanostores/react'
import { useEffect } from 'react'
import { redirectPage } from '@nanostores/router'

import { authStore, logout } from '../stores/auth.js'
import { router } from '../stores/router.js'

export const LogoutPage = (): null => {
  const { id: userId } = useStore(authStore)

  useEffect(() => {
    if (userId) {
      logout()
    } else {
      redirectPage(router, 'main', {})
    }
  }, [userId])

  return null
}
