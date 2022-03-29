import cn from 'classnames'
import { useClient, useFilter } from '@logux/client/react'
import { changeSyncMapById } from '@logux/client'

import { ControlPanel } from '../ControlPanel/ControlPanel'
import { TextInput } from '../TextInput/TextInput'
import { ToggleAction } from '../ToggleAction/ToggleAction'
import { tasks } from '../../stores/tasks'
import styles from './TodosList.module.css'

export const TodosList = (): JSX.Element => {
  const data = useFilter(tasks)
  const client = useClient()

  return (
    <div className={styles.todosList}>
      <TextInput theme="flat" />

      <div className={styles.toggleAction}>
        <ToggleAction />
      </div>

      <ul className={styles.list}>
        {data.list.map(todo => (
          <li className={styles.listItem} key={todo.id}>
            <div
              className={cn(
                styles.note,
                todo.completed && styles.note_completed
              )}
            >
              <input
                className={styles.checkbox}
                type="checkbox"
                id={`todo-${todo.id}`}
                onChange={event => {
                  changeSyncMapById(client, tasks, todo.id, {
                    completed: Boolean(event.target.checked)
                  })
                }}
              />
              <label className={styles.label} htmlFor={`todo-${todo.id}`}>
                {todo.text}
              </label>
              <button className={styles.deleteControl} type="button" />
            </div>
            <input className={styles.textInput} value={todo.text} />
          </li>
        ))}
      </ul>

      <ControlPanel />
    </div>
  )
}
