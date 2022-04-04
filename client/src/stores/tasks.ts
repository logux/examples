import { syncMapTemplate } from '@logux/client'

import { Task } from '../../../api/index.js'

export const tasksStore = syncMapTemplate<Task>('tasks')
