import { useLocation } from 'wouter'
import { useStore } from '@nanostores/react'

import { TodosList } from '../components/TodosList/TodosList'
import { authStore } from '../stores/auth'

export const MainPage = (): JSX.Element => {
  const { id: userId } = useStore(authStore)

  const [, setLocation] = useLocation()

  if (!userId) {
    setLocation('/auth')
  }

  return <TodosList />
}
