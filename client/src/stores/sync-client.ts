import { CrossTabClient, badge, badgeEn, log, confirm } from '@logux/client'
import { badgeStyles } from '@logux/client/badge/styles'

import { subprotocol } from '../../../api'

export let client = new CrossTabClient({
  subprotocol,
  server: 'ws://127.0.0.1:31337/',
  userId: 'TEMPORARY'
})

badge(client, { messages: badgeEn, styles: badgeStyles })
log(client)
confirm(client)

client.start()
