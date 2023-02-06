import { badge, badgeEn, confirm, CrossTabClient, log } from '@logux/client'
import { badgeStyles } from '@logux/client/badge/styles'
import { Client } from '@logux/client/client'
import { atom } from 'nanostores'

import { subprotocol } from '../../../api/index.js'
import { logout } from './auth.js'

const loguxServer = `${
  window.location.protocol.endsWith('s') ? 'wss' : 'ws'
}://${window.location.host}/logux`

let client = new CrossTabClient({
  subprotocol,
  userId: '',
  server: loguxServer
})

badge(client, { messages: badgeEn, styles: badgeStyles })
log(client)
confirm(client)

client.node.catch(error => {
  if (error.type === 'wrong-credentials') {
    logout()
  }
})

export const clientStore = atom<Client>(client)
