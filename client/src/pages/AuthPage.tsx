import { useStore } from '@nanostores/react'
import { Redirect } from 'wouter'

import { AuthForm } from '../components/AuthForm/AuthForm.js'
import { authStore } from '../stores/auth.js'

export const AuthPage = (): JSX.Element => {
  const { id: userId } = useStore(authStore)

  return userId ? <Redirect to="/" /> : <AuthForm />
}
