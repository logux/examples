import { Module } from "vuex";
import { LoguxCommit } from '@logux/vuex/create-logux'
import { login, loginDone, anonymousUserId } from '../../../types/auth';

type status = 'notLogged' | 'waitLogin' | 'logged'

export default function(changeUser: (clientId: string, token: string) => void ): Module<{ status: status, userId: string, login: string }, any> {
  const store: Module<{ status: status, userId: string, login: string }, any> = {
    state: { status: 'notLogged', userId: '', login: '' },
    mutations: {
      [login.type](state) {
        state.status = 'waitLogin'
      },
      [loginDone.type](state, { payload }) {
        state.userId = payload.userId
        state.status = 'waitLogin'
        state.login = payload.login

        changeUser(payload.userId, payload.token)
      },
      'auth/done'(state, { logged }) {
        state.status = logged ? 'logged' : 'notLogged'
      },
      'auth/logout'(state) {
        state.status = 'waitLogin'
        changeUser(anonymousUserId, '')
      },
    },
    actions: {
    }
  }

  return store
}
