import { BaseServer } from '@logux/server/base-server'
import {
  defineChangedSyncMap,
  defineChangeSyncMap,
  defineCreatedSyncMap,
  defineCreateSyncMap,
  SyncMapCreateAction
} from '@logux/actions'

import { Task } from '../../api'
import { changeTask, createTask, getUserTasks } from '../db'

const channel = 'tasks'

export default (server: BaseServer): void => {
  let createAction = defineCreateSyncMap<Task>(channel)
  let createdAction = defineCreatedSyncMap<Task>(channel)
  let changedAction = defineChangedSyncMap<Task>(channel)
  let changeAction = defineChangeSyncMap<Task>(channel)

  server.channel(channel, {
    async accessAndLoad(ctx) {
      const tasks = await getUserTasks()

      const actions: SyncMapCreateAction<Task>[] = tasks.map(task =>
        createdAction({
          id: task.id,
          fields: task
        })
      )

      tasks.forEach((task: Task) => {
        server.subscribe(ctx.nodeId, `${channel}/${task.id}`)
      })

      return actions
    },

    filter(subscriber) {
      return ctx => {
        return ctx.userId === subscriber.userId
      }
    }
  })

  server.type(createAction, {
    async accessAndProcess(ctx, action) {
      await createTask(ctx.userId, { id: action.id, ...action.fields })

      await server.log.add(
        createdAction({ id: action.id, fields: action.fields })
      )
    }
  })

  server.type(changeAction, {
    async accessAndProcess(ctx, action) {
      await changeTask(action.id, action.fields)

      await server.log.add(
        changedAction({ id: action.id, fields: action.fields })
      )
    }
  })
}
