import { createRouter } from '@nanostores/router'

export const router = createRouter({
  main: '/',
  login: '/login',
  logout: '/logout'
} as const)
