import { useStore } from '@nanostores/react'
import { useLocation } from 'wouter'

import { authStore, logout } from '../stores/auth'

export const LogoutPage = (): null => {
  const { id } = useStore(authStore)

  const [, setLocation] = useLocation()

  if (id) {
    logout()
  } else {
    setLocation('/auth')
  }

  return null
}
