import jwt from 'jwt-simple'
import { Server } from '@logux/server'
import { login, loginDone, anonymousUserId } from '../types/auth'

function getSecret(): string {
  if (process.env.JWT_SECRET) {
    return process.env.JWT_SECRET
  }
  console.error('JWT_SECRET undefined')
  console.error('please, use environment variable or dotenv file to set JWT_SECRET')
  console.error('use long constant randomly generated string')
  process.exit(1)
}

const secret = getSecret()

export function isAnonymous(login: string) {
  return login === anonymousUserId
}

export default function (server: Server) {
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

  server.type<ReturnType<typeof login>>(login.type, {
    async access(ctx) {
      return isAnonymous(ctx.userId)
    },
    async process(ctx, action, meta) {
      // check user login and password here
      // ...
      let token = jwt.encode({ sub: action.payload.userId }, secret)
      ctx.sendBack(loginDone({ userId: action.payload.userId, token }))
    }
  })
}
