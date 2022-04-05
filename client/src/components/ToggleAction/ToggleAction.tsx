import { ChangeEvent, useCallback } from 'react'
import { changeSyncMapById } from '@logux/client'
import { useClient, useFilter } from '@logux/client/react'
import { useStore } from '@nanostores/react'

import { tasksStore } from '../../stores/tasks.js'
import { authStore } from '../../stores/auth.js'
import styles from './ToggleAction.module.css'

export const ToggleAction = (): JSX.Element => {
  const client = useClient()
  const { id: authorId } = useStore(authStore)
  const tasks = useFilter(tasksStore, { authorId })

  const handleToggleAction = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      tasks.list.forEach(task =>
        changeSyncMapById(client, tasksStore, task.id, {
          completed: event.target.checked
        })
      )
    },
    [client, tasks]
  )

  return (
    <>
      <input
        id="toggle-all"
        className={styles.action}
        type="checkbox"
        onChange={handleToggleAction}
      />
      <label htmlFor="toggle-all" className={styles.label}>
        Mark all as complete
      </label>
    </>
  )
}
