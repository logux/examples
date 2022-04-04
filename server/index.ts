import { Server } from '@logux/server'

import { subprotocol } from '../api'

const server = new Server(
  Server.loadOptions(process, {
    subprotocol,
    supports: '1.x',
    fileUrl: import.meta.url
  })
)

server
  .autoloadModules(
    process.env.NODE_ENV === 'production'
      ? 'modules/*.js'
      : ['modules/*.ts', '!modules/*.test.ts']
  )
  .then(() => {
    server.listen()
  })
