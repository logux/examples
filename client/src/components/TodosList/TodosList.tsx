import cn from 'classnames'
import { useClient, useFilter } from '@logux/client/react'
import { createSyncMap } from '@logux/client'
import { nanoid } from 'nanoid'
import { useCallback, useEffect, useState } from 'react'
import { useStore } from '@nanostores/react'

import { ControlPanel } from '../ControlPanel/ControlPanel.js'
import { TextInput } from '../TextInput/TextInput.js'
import { ToggleAction } from '../ToggleAction/ToggleAction.js'
import { TodosListItem } from './TodosListItem.js'
import { authStore } from '../../stores/auth.js'
import { tasksStore } from '../../stores/tasks.js'
import { Filter, filterStore } from '../../stores/filter.js'
import styles from './TodosList.module.css'

export const TodosList = (): JSX.Element => {
  const client = useClient()
  const { id: userId } = useStore(authStore)
  const filter = useStore(filterStore)
  const [editableItemId, setEditableItemId] = useState('')
  const [newTaskTitle, setNewTaskTitle] = useState('')
  const itemLabelRefs: { [key: string]: HTMLInputElement | null } = {}

  const tasks = useFilter(tasksStore, {
    userId,
    ...(filter !== Filter.all ? { completed: filter === Filter.completed } : {})
  })

  const handleNewTaskInputChange = useCallback(event => {
    setNewTaskTitle(event.target.value)
  }, [])

  const handleItemOutsideClick = useCallback(
    event => {
      if (event.target === itemLabelRefs[editableItemId]) return

      setEditableItemId('')
    },
    [editableItemId]
  )

  const handleSubmit = useCallback(
    event => {
      event.preventDefault()

      createSyncMap(client, tasksStore, {
        id: nanoid(),
        text: newTaskTitle,
        completed: false,
        userId
      })

      setNewTaskTitle('')
    },
    [newTaskTitle]
  )

  useEffect(() => {
    document.addEventListener('click', handleItemOutsideClick)

    return () => {
      document.removeEventListener('click', handleItemOutsideClick)
    }
  }, [editableItemId])

  return (
    <div className={styles.todosList}>
      <form onSubmit={handleSubmit}>
        <TextInput
          id="create-new-task"
          label="Create new task"
          placeholder="What needs to be done?"
          theme="flat"
          value={newTaskTitle}
          onChange={handleNewTaskInputChange}
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
