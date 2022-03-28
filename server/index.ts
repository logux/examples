import { Server } from '@logux/server'

import { subprotocol } from '../api'

const server = new Server(
  Server.loadOptions(process, {
    subprotocol,
    supports: '1.x',
    fileUrl: import.meta.url
  })
)

server.autoloadModules().then(() => {
  server.auth(() => {
    return true
  })

  server.listen()
})
