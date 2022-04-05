import {
  addSyncMap,
  addSyncMapFilter,
  BaseServer,
  ChangedAt,
  NoConflictResolution
} from '@logux/server'
import { defineSyncMapActions, LoguxNotFoundError } from '@logux/actions'

import {
  changeTask,
  createTask,
  deleteTask,
  findTask,
  getUserTasks
} from '../db.js'
import { Task } from '../../api/index.js'

const modelName = 'tasks'

const [createTaskActionType] = defineSyncMapActions(modelName)

export default (server: BaseServer): void => {
  addSyncMap<Task>(server, modelName, {
    async access(ctx, id, action) {
      if (createTaskActionType.type === action.type && 'fields' in action) {
        return ctx.userId === action.fields.authorId
      } else {
        const task = await findTask(id)
        return ctx.userId === task?.authorId
      }
    },

    async load(ctx, id) {
      const task = await findTask(id)

      if (!task) throw new LoguxNotFoundError()

      return {
        id,
        text: ChangedAt(task.text, task.textChangeTime),
        completed: ChangedAt(task.completed, task.completedChangeTime),
        authorId: NoConflictResolution(task.authorId)
      }
    },

    create(ctx, id, fields, time) {
      createTask(ctx.userId, {
        id,
        ...fields,
        textChangeTime: time,
        completedChangeTime: time
      })
    },

    async change(ctx, id, fields) {
      const task = await findTask(id)

      if (!task) throw new LoguxNotFoundError()

      await changeTask(id, fields)
    },

    async delete(ctx, id) {
      await deleteTask(id)
    }
  })

  addSyncMapFilter<Task>(server, modelName, {
    access(ctx, id, action) {
      return ctx.userId === action.filter?.authorId
    },

    async initial(ctx) {
      const tasks = await getUserTasks(ctx.userId)

      return tasks.map(task => ({
        id: task.id,
        text: ChangedAt(task.text, task.textChangeTime),
        completed: ChangedAt(task.completed, task.completedChangeTime),
        authorId: NoConflictResolution(task.authorId)
      }))
    },

    actions(filterCtx) {
      return actionCtx => {
        return actionCtx.userId === filterCtx.userId
      }
    }
  })
}
