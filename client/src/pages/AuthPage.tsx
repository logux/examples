import { useStore } from '@nanostores/react'
import { useLocation } from 'wouter'

import { AuthForm } from '../components/AuthForm/AuthForm'
import { authStore } from '../stores/auth'

export const AuthPage = (): JSX.Element => {
  const { id: userId } = useStore(authStore)

  const [, setLocation] = useLocation()

  if (userId) {
    setLocation('/')
  }

  return <AuthForm />
}
