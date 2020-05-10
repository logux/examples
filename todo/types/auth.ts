import { actionCreatorFactory } from 'typescript-fsa'

let createAction = actionCreatorFactory('auth')

export const login = createAction<{
  userId: string,
}>('login')

export const loginDone = createAction<{
  userId: string,
  token: string,
}>('login/done')

export const anonymousUserId = 'anonymous'
