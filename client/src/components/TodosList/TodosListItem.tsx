import cn from 'classnames'
import { useClient } from '@logux/client/react'
import { changeSyncMapById, deleteSyncMapById } from '@logux/client'
import { useCallback, useEffect, useState, KeyboardEvent } from 'react'

import { TextInput } from '../TextInput/TextInput'
import { tasksStore } from '../../stores/tasks'
import styles from './TodosList.module.css'

type Props = {
  id: string
  completed: boolean
  text: string
}

export const TodosListItem = ({ id, completed, text }: Props): JSX.Element => {
  const client = useClient()
  const [editableItemId, setEditableItemId] = useState('')
  const [editableInitialValue, setEditableInitialValue] = useState('')
  const itemLabelRefs: { [key: string]: HTMLInputElement | null } = {}

  const handleItemClick = useCallback(event => {
    event.preventDefault()
  }, [])

  const handleItemDoubleClick = useCallback(
    (event, todoId, todoText) => {
      setEditableItemId(todoId)
      setEditableInitialValue(todoText)
    },
    [itemLabelRefs, editableItemId]
  )

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>, todoId: string) => {
      if (event.key === 'Escape') {
        changeSyncMapById(client, tasksStore, todoId, {
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

  useEffect(() => {
    document.addEventListener('click', handleItemOutsideClick)

    return () => {
      document.removeEventListener('click', handleItemOutsideClick)
    }
  }, [editableItemId])

  return (
    <li
      className={cn(
        styles.listItem,
        id === editableItemId && styles.listItemEditable
      )}
    >
      <div className={cn(styles.note, completed && styles.noteCompleted)}>
        <input
          className={styles.checkbox}
          type="checkbox"
          id={`todo-${id}`}
          onChange={event => {
            changeSyncMapById(client, tasksStore, id, {
              completed: Boolean(event.target.checked)
            })
          }}
          checked={completed}
        />
        <label
          className={styles.label}
          htmlFor={`todo-${id}`}
          onClick={event => {
            handleItemClick(event)
          }}
          onDoubleClick={event => {
            handleItemDoubleClick(event, id, text)
          }}
        >
          {text}
        </label>
        <button
          className={styles.deleteControl}
          type="button"
          onClick={() => {
            deleteSyncMapById(client, tasksStore, id)
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
        value={text}
        ref={ref => {
          itemLabelRefs[id] = ref
        }}
        onKeyDown={event => {
          handleKeyDown(event, id)
        }}
        onChange={event => {
          changeSyncMapById(client, tasksStore, id, {
            text: event.target.value
          })
        }}
      />
    </li>
  )
}
