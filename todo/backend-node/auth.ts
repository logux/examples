import jwt from 'jwt-simple'
import { Server } from '@logux/server'
import { nanoid } from 'nanoid'

const secret = nanoid() // generate new pseudorandom secret

export function isAnonymous(login: string) {
  return login == ''
}

export default function(server: Server) {
  server.auth((userId, token) => {
    if (isAnonymous(userId)) {
      return true
    }
    try {
      const data = jwt.decode(token, secret)
      return data.sub === userId
    } catch (e) {
      return false
    }
  })

  server.type('login', {
    async access (ctx) {
      return isAnonymous(ctx.userId)
    },
    async process (ctx, action, meta) {
      // check user login and password
      const login = action.login
      if (!login) {
        server.undo(meta, 'Require login')
      } else {
        let token = jwt.encode({ sub: login }, secret)
        ctx.sendBack({ type: 'login/done', userId: login, token })
      }
    }
  })
}
