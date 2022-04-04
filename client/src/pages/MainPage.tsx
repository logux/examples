import { useLocation } from 'wouter'
import { useStore } from '@nanostores/react'
import { useEffect } from 'react'

import { TodosList } from '../components/TodosList/TodosList.js'
import { authStore } from '../stores/auth.js'

export const MainPage = (): JSX.Element => {
  const { id: userId } = useStore(authStore)

  const [, setLocation] = useLocation()

  useEffect(() => {
    if (!userId) {
      setLocation('/auth')
    }
  }, [userId])

  return <TodosList />
}
