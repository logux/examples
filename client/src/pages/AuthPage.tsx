import { useStore } from '@nanostores/react'
import { useLocation } from 'wouter'
import { useEffect } from 'react'

import { AuthForm } from '../components/AuthForm/AuthForm'
import { authStore } from '../stores/auth'

export const AuthPage = (): JSX.Element => {
  const { id: userId } = useStore(authStore)

  const [, setLocation] = useLocation()

  useEffect(() => {
    if (userId) {
      setLocation('/')
    }
  }, [userId])

  return <AuthForm />
}