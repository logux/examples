import { BaseServer } from '@logux/server/base-server'
import { IncomingMessage } from 'http'

import { findUser } from '../db'
import { User } from '../../api'

const cookieSessionIdKey = 'sessionId'
const activeSessions = new Map<string, boolean>()
let lastSessionId = 0

async function signIn(req: IncomingMessage): Promise<[string, User] | null> {
  let data = ''

  req.on('data', chunk => {
    data += chunk
  })

  return new Promise(resolve => {
    req.on('end', () => {
      const parsed = JSON.parse(data)

      const user = findUser(parsed.name)

      if (user && user.password === parsed.password) {
        const sessionId = lastSessionId++
        activeSessions.set(sessionId.toString(), true)
        resolve([sessionId.toString(), user])
        return
      }

      resolve(null)
    })
  })
}

export default function applyAuth(server: BaseServer): void {
  server.http(async (req, res) => {
    if (req.url === '/auth') {
      if (req.method === 'POST') {
        const sessionData = await signIn(req)

        if (sessionData !== null) {
          res.setHeader(
            'Set-Cookie',
            `${cookieSessionIdKey}=${sessionData[0]}; Path=/; HttpOnly;`
          )

          res.write(JSON.stringify({ id: sessionData[1].id }))
          res.end()
        } else {
          res.statusCode = 400
          res.end('Wrong user or password')
        }
      }

      if (req.method === 'DELETE') {
        const maybeSessionId = req.headers.cookie
          ?.split(';')
          ?.map(it => it.trim())
          ?.find(it => it.startsWith(cookieSessionIdKey))
          ?.split('=')?.[1]

        if (maybeSessionId) {
          activeSessions.delete(maybeSessionId)
          res.end()
        } else {
          res.statusCode = 404
          res.end('Session not found')
        }
      }
    }
  })

  server.auth(props => {
    return activeSessions.has(props.cookie[cookieSessionIdKey])
  })
}
