import jwt from 'jwt-simple'
import { Server } from '@logux/server'
import {nanoid} from 'nanoid'
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

const users: {[key: string]: string} = {}

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
      let userId = users[action.payload.login]
      if(!userId) {
        userId = nanoid()
        users[action.payload.login] = userId
      }
      let token = jwt.encode({ sub: userId }, secret)
      ctx.sendBack(loginDone({ userId, token, login: action.payload.login }))
    }
  })
}
