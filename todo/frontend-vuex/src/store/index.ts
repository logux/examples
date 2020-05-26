import Vue from 'vue'
import Vuex from 'vuex'
import { createLogux } from '@logux/vuex'
import { log, IndexedStore } from '@logux/client'
import { anonymousUserId, loginDone } from '../../../types/auth'
import authCreator from './auth'
import todo from './todo'

Vue.use(Vuex)

const Logux = createLogux({
  subprotocol: '1.0.0',
  server: 'ws://127.0.0.1:31337/',
  userId: anonymousUserId,
  token: '',
  store: new IndexedStore('todo-vue')
})

async function changeUser(clientId: string, token: string) {
  store.client.changeUser(clientId, token)
  await store.client.node.waitFor('synchronized')
  store.commit('auth/done', {logged: clientId != anonymousUserId})
}

const auth = authCreator(changeUser)

const store = new Logux.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth,
    todo,
  }
})

log(store.client)

store.log.on('preadd', (action, meta) => {
  if (action.type.startsWith('auth/')) {
    meta.reasons.splice(0, meta.reasons.length)
  }
  if (action.type == loginDone.type) {
    meta.reasons.push('userId')
  }
  if (action.type == 'auth/logout') {
    store.log.removeReason('userId', {})
  }
})

store.client.start()

export default store
