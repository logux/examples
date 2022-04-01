import { badge, badgeEn, confirm, CrossTabClient, log } from '@logux/client'
import { badgeStyles } from '@logux/client/badge/styles'
import { atom, onMount } from 'nanostores'
import { Client } from '@logux/client/client'

import { subprotocol } from '../../../api'
import { authStore, logout } from './auth'

export const clientStore = atom<Client>()

const LOGUX_SERVER = `${
  window.location.protocol.endsWith('s') ? 'wss' : 'ws'
}://${window.location.host}/logux`

onMount(clientStore, () => {
  const client = new CrossTabClient({
    subprotocol,
    userId: '',
    server: LOGUX_SERVER
  })

  badge(client, { messages: badgeEn, styles: badgeStyles })
  log(client)
  confirm(client)

  let started = false

  clientStore.set(client)

  let authUnsubscribe = authStore.subscribe(({ id }, changedKey) => {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (!changedKey || changedKey === 'id') {
      if (id) {
        client.changeUser(id)

        if (started) {
          client.node.connection.connect()
        } else {
          client.start()
          started = true
        }
      } else if (client.node.connected) {
        client.node.connection.disconnect()
        client.changeUser('')
      }
    }
  })

  client.node.catch(error => {
    if (error.type === 'wrong-credentials') {
      logout()
    }
  })

  return () => {
    authUnsubscribe()
    client.destroy()
  }
})
