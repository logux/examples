import { Redirect } from 'wouter'
import { useStore } from '@nanostores/react'

import { TodosList } from '../components/TodosList/TodosList.js'
import { authStore } from '../stores/auth.js'

export const MainPage = (): JSX.Element => {
  const { id: userId } = useStore(authStore)

  return userId ? <TodosList /> : <Redirect to="/auth" />
}
