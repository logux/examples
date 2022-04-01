import { syncMapTemplate } from '@logux/client'

import { Task } from '../../../api'

export const tasksStore = syncMapTemplate<Task>('tasks')
