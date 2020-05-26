import { Server } from '@logux/server'
import { isAnonymous } from './auth'
import * as types from '../types/todos'

export default function (server: Server) {
  const storage: {
    [key: string]: { [key: string]: types.Todo; };
  } = {}

  function userTodos(userId: string): { [key: string]: types.Todo; } {
    if (!storage[userId]) {
      storage[userId] = {}
    }
    return storage[userId]
  }

  server.channel<{ id: string }>('todos/:id', {
    access(ctx, action, meta) {
      return !isAnonymous(ctx.userId) && ctx.params.id === ctx.userId
    },
    load(ctx, action, meta) {
      const todos = userTodos(ctx.params.id)
      Object.entries(todos).forEach(([_, todo]) => ctx.sendBack(types.add(todo)))
    }
  })

  server.type<ReturnType<typeof types.add>>(types.add.type, {
    access(ctx, action, meta) {
      return !isAnonymous(ctx.userId)
    },
    resend(ctx, action, meta) {
      return { channel: 'todos/' + ctx.userId }
    },
    process(ctx, action, meta) {
      const todos = userTodos(ctx.userId)
      // allow add or fully rewrite todo
      todos[action.payload.id] = action.payload
    }
  })

  server.type<ReturnType<typeof types.remove>>(types.remove.type, {
    access(ctx, action, meta) {
      return !isAnonymous(ctx.userId)
    },
    resend(ctx, action, meta) {
      return { channel: 'todos/' + ctx.userId }
    },
    process(ctx, action, meta) {
      const todos = userTodos(ctx.userId)
      delete todos[action.payload.id]
    }
  })

  server.type<ReturnType<typeof types.editText>>(types.editText.type, {
    access(ctx, action, meta) {
      return !isAnonymous(ctx.userId)
    },
    resend(ctx, action, meta) {
      return { channel: 'todos/' + ctx.userId }
    },
    process(ctx, action, meta) {
      const todos = userTodos(ctx.userId)
      todos[action.payload.id].text = action.payload.text
    }
  })

  server.type<ReturnType<typeof types.toggle>>(types.toggle.type, {
    access(ctx, action, meta) {
      return !isAnonymous(ctx.userId)
    },
    resend(ctx, action, meta) {
      return { channel: 'todos/' + ctx.userId }
    },
    process(ctx, action, meta) {
      const todos = userTodos(ctx.userId)
      todos[action.payload.id].done = action.payload.done
    }
  })
}
