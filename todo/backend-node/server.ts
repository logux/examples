import { Server } from '@logux/server'
import auth from './auth'
import todos from './todos'

const server = new Server(
  Server.loadOptions(process, {
    subprotocol: '1.0.0',
    supports: '1.0.0',
  })
)

auth(server)

todos(server)

server.listen()
