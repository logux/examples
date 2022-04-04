import { BaseServer } from '@logux/server/base-server'
import {
  defineChangedSyncMap,
  defineChangeSyncMap,
  defineCreatedSyncMap,
  defineCreateSyncMap,
  defineDeletedSyncMap,
  defineDeleteSyncMap
} from '@logux/actions'

import { Task } from '../../api/index.js'
import {
  changeTask,
  createTask,
  deleteTask,
  findTask,
  getUserTasks
} from '../db.js'

const channel = 'tasks'

export default (server: BaseServer): void => {
  const createAction = defineCreateSyncMap<Task>(channel)
  const changeAction = defineChangeSyncMap<Task>(channel)
  const deleteAction = defineDeleteSyncMap(channel)

  const createdAction = defineCreatedSyncMap<Task>(channel)
  const changedAction = defineChangedSyncMap<Task>(channel)
  const deletedAction = defineDeletedSyncMap(channel)

  server.channel(channel, {
    async accessAndLoad(ctx) {
      const tasks = await getUserTasks(ctx.userId)

      const actions = tasks.map(task =>
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

  server.channel<{ id: string }>(`${channel}/:id`, {
    async accessAndLoad(ctx) {
      let task

      try {
        task = await findTask(ctx.params.id)
      } catch (e) {
        server.logger.error(
          { error: JSON.stringify(e) },
          'Error while getting resource'
        )
        throw e
      }

      if (task) {
        return createdAction({ id: task.id, fields: task })
      } else {
        return []
      }
    }
  })

  server.type(createdAction, {
    access() {
      return false
    },

    resend() {
      return channel
    }
  })

  server.type(changedAction, {
    access() {
      return false
    },

    resend(ctx, action) {
      return [channel, `${channel}/${action.id}`]
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

  server.type(deleteAction, {
    async accessAndProcess(ctx, action) {
      await deleteTask(action.id)

      await server.log.add(deletedAction({ id: action.id }))
    }
  })
}
