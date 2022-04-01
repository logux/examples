import cn from 'classnames'
import { useClient, useFilter } from '@logux/client/react'
import {
  changeSyncMapById,
  createSyncMap,
  deleteSyncMapById
} from '@logux/client'
import { nanoid } from 'nanoid'
import { useCallback, useEffect, useState, KeyboardEvent } from 'react'
import { useStore } from '@nanostores/react'

import { ControlPanel } from '../ControlPanel/ControlPanel'
import { TextInput } from '../TextInput/TextInput'
import { ToggleAction } from '../ToggleAction/ToggleAction'
import { tasksStore } from '../../stores/tasks'
import { Filter, filterStore } from '../../stores/filter'
import styles from './TodosList.module.css'

export const TodosList = (): JSX.Element => {
  const client = useClient()
  const filter = useStore(filterStore)
  const [editableItemId, setEditableItemId] = useState('')
  const [editableInitialValue, setEditableInitialValue] = useState('')
  const [newTaskTitle, setNewTaskTitle] = useState('')
  const itemLabelRefs: { [key: string]: HTMLInputElement | null } = {}

  const tasksFilter =
    filter !== Filter.all
      ? {
          completed: filter === Filter.completed
        }
      : undefined
  const tasks = useFilter(tasksStore, tasksFilter)

  const handleNewTaskInputChange = useCallback(event => {
    setNewTaskTitle(event.target.value)
  }, [])

  const handleItemClick = useCallback(event => {
    event.preventDefault()
  }, [])

  const handleItemDoubleClick = useCallback(
    (event, id, text) => {
      setEditableItemId(id)
      setEditableInitialValue(text)
    },
    [itemLabelRefs, editableItemId]
  )

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>, id: string) => {
      if (event.key === 'Escape') {
        changeSyncMapById(client, tasksStore, id, {
          text: editableInitialValue
        })

        setEditableItemId('')
      } else if (event.key === 'Enter') {
        setEditableItemId('')
      }
    },
    [editableItemId, client]
  )

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
        completed: false
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
            <li
              className={cn(
                styles.listItem,
                todo.id === editableItemId && styles.listItemEditable
              )}
              key={todo.id}
            >
              <div
                className={cn(
                  styles.note,
                  todo.completed && styles.noteCompleted
                )}
              >
                <input
                  className={styles.checkbox}
                  type="checkbox"
                  id={`todo-${todo.id}`}
                  onChange={event => {
                    changeSyncMapById(client, tasksStore, todo.id, {
                      completed: Boolean(event.target.checked)
                    })
                  }}
                  checked={todo.completed}
                />
                <label
                  className={styles.label}
                  htmlFor={`todo-${todo.id}`}
                  onClick={event => {
                    handleItemClick(event)
                  }}
                  onDoubleClick={event => {
                    handleItemDoubleClick(event, todo.id, todo.text)
                  }}
                >
                  {todo.text}
                </label>
                <button
                  className={styles.deleteControl}
                  type="button"
                  onClick={() => {
                    deleteSyncMapById(client, tasksStore, todo.id)
                  }}
                >
                  Delete task
                </button>
              </div>
              <TextInput
                id="create-new-task"
                label="Create new task"
                placeholder="What needs to be done?"
                theme="default"
                className={styles.textInput}
                value={todo.text}
                ref={ref => {
                  itemLabelRefs[todo.id] = ref
                }}
                onKeyDown={event => {
                  handleKeyDown(event, todo.id)
                }}
                onChange={event => {
                  changeSyncMapById(client, tasksStore, todo.id, {
                    text: event.target.value
                  })
                }}
              />
            </li>
          ))}
        </ul>
      )}

      <ControlPanel />
    </div>
  )
}
