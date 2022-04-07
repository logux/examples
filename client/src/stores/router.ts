import { createRouter } from '@nanostores/router'

interface Routes {
  main: void
  login: void
  logout: void
}

export const router = createRouter<Routes>({
  main: '/',
  login: '/login',
  logout: '/logout'
})
