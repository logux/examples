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

function findTodoIndex(todos, id) {
  return todos.findIndex(t => t.id == id)
}

const store = new Logux.Store({
  state: {
    todos: []
  },
  mutations: {
    addTodo (state, todo) {
      state.todos.push(todo)
    },
  
    removeTodo (state, { id }) {
      const index = findTodoIndex(state.todos, id)
      if (index != -1) {
        state.todos.splice(index, 1)
      }
    },
  
    editText (state, { id, text }) {
      const index = findTodoIndex(state.todos, id)
      const todo = state.todos[index]
  
      state.todos.splice(index, 1, {
        ...todo,
        text,
      })
    },
  
    toggle (state, { id, done }) {
      const index = findTodoIndex(state.todos, id)
      const todo = state.todos[index]
  
      state.todos.splice(index, 1, {
        ...todo,
        done,
      })
    },
  },
  actions: {  
  },
  modules: {
  }
})

log(store.client)

store.client.start()

store.client.log.add({ type: 'logux/subscribe', channel: 'todos' }, { sync: true })

export default store