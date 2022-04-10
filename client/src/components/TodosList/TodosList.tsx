import cn from 'classnames'
import { useClient, useFilter } from '@logux/client/react'
import { createSyncMap } from '@logux/client'
import { useCallback, useState } from 'react'
import { useStore } from '@nanostores/react'
import { nanoid } from 'nanoid'

import { ControlPanel } from '../ControlPanel/ControlPanel.js'
import { TextField } from '../TextField/TextField.js'
import { ToggleAction } from '../ToggleAction/ToggleAction.js'
import { TodosListItem } from './TodosListItem.js'
import { authStore } from '../../stores/auth.js'
import { tasksStore } from '../../stores/tasks.js'
import { Filter, filterStore } from '../../stores/filter.js'
import styles from './TodosList.module.css'

export const TodosList = (): JSX.Element => {
  const client = useClient()
  const filter = useStore(filterStore)
  const { id: authorId } = useStore(authStore)
  const [newTaskTitle, setNewTaskTitle] = useState('')

  const tasks = useFilter(tasksStore, {
    authorId,
    ...(filter === Filter.all ? {} : { completed: filter === Filter.completed })
  })

  const handleNewTaskInputChange = useCallback(event => {
    setNewTaskTitle(event.target.value)
  }, [])

  const handleSubmit = useCallback(
    event => {
      event.preventDefault()

      createSyncMap(client, tasksStore, {
        id: nanoid(),
        text: newTaskTitle,
        completed: false,
        authorId
      })

      setNewTaskTitle('')
    },
    [newTaskTitle]
  )

  return (
    <div className={styles.todosList}>
      <form onSubmit={handleSubmit}>
        <TextField
          id="create-new-task"
          label="Create new task"
          placeholder="What needs to be done?"
          theme="flat"
          value={newTaskTitle}
          onChange={handleNewTaskInputChange}
          hiddenLabel
        />
        <button type="submit" className={styles.createAction}>
          Create
        </button>
      </form>

      <div className={styles.toggleAction}>
        <ToggleAction />
      </div>

      {tasks.isLoading ? (
        <div className={cn(styles.note, styles.noteTypeSkeleton)}>
          <span className={styles.label} />
        </div>
      ) : (
        <ul className={styles.list}>
          {tasks.list.map(todo => (
            <TodosListItem
              key={todo.id}
              id={todo.id}
              completed={todo.completed}
              text={todo.text}
            />
          ))}
        </ul>
      )}

      <ControlPanel />
    </div>
  )
}
