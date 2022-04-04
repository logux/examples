import { ChangeEvent, useCallback } from 'react'
import { changeSyncMapById } from '@logux/client'
import { useClient, useFilter } from '@logux/client/react'

import { tasksStore } from '../../stores/tasks.js'
import styles from './ToggleAction.module.css'

export const ToggleAction = (): JSX.Element => {
  const client = useClient()
  const tasks = useFilter(tasksStore)

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
