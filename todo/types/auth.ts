import { actionCreatorFactory } from 'typescript-fsa'

let createAction = actionCreatorFactory()

export const login = createAction<{
  userId: string,
}>('auth/login')

export const loginDone = createAction<{
  userId: string,
  token: string,
}>('auth/login/done')

export const anonymousUserId = 'anonymous'
