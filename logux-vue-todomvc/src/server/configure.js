const { Server } = require('@logux/server')
const { nanoid } = require('nanoid')

const server = new Server(
  Server.loadOptions(process, {
    controlSecret: 'secret',
    subprotocol: '1.0.0',
    supports: '1.0.0',
  })
)

server.auth((userId, token) => {
  return true
})

// simplest solution - store all actions in memory
// in real application you will use some real DB for persistance 
const todos = {}

function allowAll(ctx, action, meta) {
  return true
}

function validateId(ctx, action, meta) {
  // in real app you need to check access rights and validate all fields
  return typeof(action.id) == 'string'
}

function resendToTodos(ctx, action, meta) {
  return { channel: 'todos' }
}

server.channel('todos', {
  access: allowAll,
  load (ctx, action, meta) {    
    Object.entries(todos).forEach(([_, todo]) => ctx.sendBack({ type: 'addTodo', ...todo}))
  }
})

// newTodo -> addTodo trick show client-server request-response pattern in logux
// in real todo app it would be better to generate id on client side
// to allow optimistic creation
server.type('newTodo', {
  access: allowAll,
  process (ctx, action, meta) {
    const todo = {
      id: nanoid(),
      text: action.text,
      done: action.done,
    }
    todos[todo.id] = todo
    ctx.sendBack({ type: 'addTodo', ...todo}, {channel: 'todos'}) // resend to all subscribers
  }
})

server.type('removeTodo', {
  access: validateId,
  resend: resendToTodos,
  process (ctx, action, meta) {
    delete todos[action.id]
  }
})

server.type('editText', {
  access: validateId,
  resend: resendToTodos,
  process (ctx, action, meta) {
    todos[action.id].text = action.text
  }
})

server.type('toggle', {
  access: validateId,
  resend: resendToTodos,
  process (ctx, action, meta) {
    todos[action.id].done = action.done
  }
})

module.exports = app => {
  // start own websocket server before vue-serve start
  server.listen()
  // we can't use `app` as server because vue-serve use websocket for his own debug purpose
}

