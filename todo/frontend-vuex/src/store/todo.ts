import { Module } from "vuex";
import { Todo, add, remove, editText, toggle } from '../../../types/todos';

function findTodoIndex(todos: Todo[], id: string) {
  return todos.findIndex(t => t.id == id)
}

const store: Module<{ list: Todo[] }, any> = {
  state: { list: [] },
  mutations: {
    [add.type](state, { payload }) {
      state.list.push(payload)
    },
    [remove.type](state, { payload }) {
      const index = findTodoIndex(state.list, payload.id)
      if (index != -1) {
        state.list.splice(index, 1)
      }
    },
    [editText.type](state, { payload }) {
      const index = findTodoIndex(state.list, payload.id)
      if (index != -1) {
        state.list[index].text = payload.text
      }
    },
    [toggle.type](state, { payload }) {
      const index = findTodoIndex(state.list, payload.id)
      if (index != -1) {
        state.list[index].done = payload.done
      }
    },
  }
}

export default store
