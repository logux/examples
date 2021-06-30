import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { Server } from '@logux/server'

const __dirname = dirname(fileURLToPath(import.meta.url))

const server = new Server(
  Server.loadOptions(process, {
    subprotocol: '1.0.0',
    supports: '1.x',
    root: __dirname
  })
)

// eslint-disable-next-line no-unused-vars
server.auth(({ userId, token }) => {
  // Allow only local users until we will have a proper authentication
  return process.env.NODE_ENV === 'development'
})

let counter = 0;

server.type('INIT', {
  access() {
    return true
  },
  process(ctx) {
    ctx.sendBack({type: 'SET_COUNTER', payload: {counter}})
  }
})

server.type('INC', {
  access() {
    return true
  },
  process() {
    counter++;
  }
})

server.type('DEC', {
  access() {
    return true
  },
  process() {
    counter--;
  }
})

server.listen()