import { actionCreatorFactory } from 'typescript-fsa'

let createAction = actionCreatorFactory('todo')

export interface TodoId {
  id: string,
}

export interface Todo extends TodoId {
  text: string,
  done: boolean,
}

export const add = createAction<Todo>('add')

export const remove = createAction<TodoId>('remove')

export const editText = createAction<TodoId & { text: string }>('editText')

export const toggle = createAction<TodoId & { done: boolean }>('toggle')
