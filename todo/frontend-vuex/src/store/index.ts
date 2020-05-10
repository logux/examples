import Vue from 'vue'
import Vuex from 'vuex'
import { createLogux } from '@logux/vuex'
import { log, IndexedStore } from '@logux/client'
import { anonymousUserId } from '../../../types/auth'
import auth from './auth'
import todo from './todo'

Vue.use(Vuex)

const Logux = createLogux({
  subprotocol: '1.0.0',
  server: 'ws://127.0.0.1:31337/',
  userId: anonymousUserId,
  token: '',
  store: new IndexedStore('todo-vue')
})

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

store.client.start()

export default store
