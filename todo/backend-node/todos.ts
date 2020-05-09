import { Server } from '@logux/server'
import { isAnonymous } from './auth'
import { nanoid } from 'nanoid'

interface Todo {
  id: string,
  text: string,
  done: boolean,
}

export default function (server: Server) {
  const storage: {
    [key: string]: { [key: string]: Todo; };
  } = {}

  function userTodos(login: string): { [key: string]: Todo; } {
    if (!storage[login]) {
      storage[login] = {}
    }
    return storage[login]
  }

  server.channel<{ id: string }>('todos/:id', {
    access(ctx, action, meta) {
      return !isAnonymous(ctx.userId) && ctx.params.id === ctx.userId
    },
    load(ctx, action, meta) {
      const todos = userTodos(ctx.params.id)
      Object.entries(todos).forEach(([_, todo]) => ctx.sendBack({ type: 'addTodo', ...todo }))
    }
  })

  // newTodo -> addTodo trick show client-server request-response pattern in logux
  // in real todo app it would be better to generate id on client side
  // to allow optimistic creation
  server.type('newTodo', {
    access(ctx, action, meta) {
      return !isAnonymous(ctx.userId)
    },
    resend(ctx, action, meta) {
      return { channel: 'todos/' + ctx.userId }
    },
    process(ctx, action, meta) {
      const todos = userTodos(ctx.userId)
      const todo = {
        id: nanoid(),
        text: action.text,
        done: action.done,
      }
      todos[todo.id] = todo
      ctx.sendBack({ type: 'addTodo', ...todo }, { channel: 'todos' }) // resend to all subscribers
    }
  })

  server.type('removeTodo', {
    access(ctx, action, meta) {
      return !isAnonymous(ctx.userId)
    },
    resend(ctx, action, meta) {
      return { channel: 'todos/' + ctx.userId }
    },
    process(ctx, action, meta) {
      const todos = userTodos(ctx.userId)
      delete todos[action.id]
    }
  })

  server.type('editText', {
    access(ctx, action, meta) {
      return !isAnonymous(ctx.userId)
    },
    resend(ctx, action, meta) {
      return { channel: 'todos/' + ctx.userId }
    },
    process(ctx, action, meta) {
      const todos = userTodos(ctx.userId)
      todos[action.id].text = action.text
    }
  })

  server.type('toggle', {
    access(ctx, action, meta) {
      return !isAnonymous(ctx.userId)
    },
    resend(ctx, action, meta) {
      return { channel: 'todos/' + ctx.userId }
    },
    process(ctx, action, meta) {
      const todos = userTodos(ctx.userId)
      todos[action.id].done = action.done
    }
  })
}
