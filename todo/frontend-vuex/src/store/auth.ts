import { Client } from '@logux/client'
import { Module } from "vuex";
import { login, loginDone } from '../../../types/auth';

type status = 'notLogged' | 'waitLogin' | 'logged'

const store: Module<{ status: status, userId: string }, any> = {
  state: { status: 'notLogged', userId: '' },
  mutations: {
    [login.type](state) {
      state.status = 'waitLogin'
    },
    [loginDone.type](state, { payload }) {
      state.userId = payload.userId
      state.status = 'waitLogin'

      const client: Client = this.client as any
      client.changeUser(payload.userId, payload.token)
      client.node.waitFor('synchronized')
        .then(() => client.log.add({type: 'auth/done'}, {sync: false}))
    },
    'auth/done'(state) {
      state.status = 'logged'
    }
  }
}

export default store
