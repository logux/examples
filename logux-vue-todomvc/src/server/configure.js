const { Server } = require('@logux/server')

const server = new Server(
  Server.loadOptions(process, {
    controlSecret: 'secret',
    subprotocol: '1.0.0',
    supports: '1.0.0',
    root: __dirname
  })
)

server.auth((userId, token) => {
  return true
})

module.exports = app => {
  // start own websocket server before vue-serve start
  server.listen()
  // we can't use `app` as server because vue-serve use websocket for his own debug purpose
}

