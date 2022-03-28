import { CrossTabClient } from '@logux/client'

import { subprotocol } from '../../../api'

export let client = new CrossTabClient({
  subprotocol,
  server: 'ws://127.0.0.1:31337/',
  userId: 'TEMPORARY'
})

client.start()
