import { syncMapTemplate } from '@logux/client'

import { Task } from '../../../api'

export const tasks = syncMapTemplate<Task>('tasks')
