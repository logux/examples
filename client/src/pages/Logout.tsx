import { useStore } from '@nanostores/react'
import { useLocation } from 'wouter'
import { useEffect } from 'react'

import { authStore, logout } from '../stores/auth.js'

export const LogoutPage = (): null => {
  const { id: userId } = useStore(authStore)

  const [, setLocation] = useLocation()

  useEffect(() => {
    if (userId) {
      logout()
    } else {
      setLocation('/auth')
    }
  }, [userId])

  return null
}
