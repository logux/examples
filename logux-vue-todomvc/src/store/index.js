import Vue from 'vue'
import Vuex from 'vuex'
import { createLogux } from '@logux/vuex'
import { log } from '@logux/client'

Vue.use(Vuex)

const Logux = createLogux({
  subprotocol: '1.0.0',
  server: 'ws://127.0.0.1:31337/',
  userId: 'global-user', // one global user
  token: '' // no auth
})

const store = new Logux.Store({
  state: {
    todos: []
  },
  mutations: {
    addTodo (state, todo) {
      state.todos.push(todo)
    },
  
    removeTodo (state, todo) {
      state.todos.splice(state.todos.indexOf(todo), 1)
    },
  
    editTodo (state, { todo, text = todo.text, done = todo.done }) {
      const index = state.todos.indexOf(todo)
  
      state.todos.splice(index, 1, {
        ...todo,
        text,
        done
      })
    }
  },
  actions: {  
  },
  modules: {
  }
})

log(store.client)

store.client.start()

export default store