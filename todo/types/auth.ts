import { actionCreatorFactory } from 'typescript-fsa'

let createAction = actionCreatorFactory('auth')

export const login = createAction<{
  login: string,
}>('login')

export const loginDone = createAction<{
  userId: string,
  login: string,
  token: string,
}>('login/done')

export const anonymousUserId = 'anonymous'
