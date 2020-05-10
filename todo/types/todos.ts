import { actionCreatorFactory } from 'typescript-fsa'

let createAction = actionCreatorFactory()

export interface TodoId {
  id: string,
}

export interface Todo extends TodoId {
  text: string,
  done: boolean,
}

export const add = createAction<Todo>('todo/add')

export const remove = createAction<TodoId>('todo/remove')

export const editText = createAction<TodoId & { text: string }>('todo/editText')

export const toggle = createAction<TodoId & { done: boolean }>('todo/toggle')
