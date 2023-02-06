import cn from 'classnames'
import { useClient } from '@logux/client/react'
import { changeSyncMapById, deleteSyncMapById } from '@logux/client'
import { useCallback, useRef, useState } from 'react'

import { TextField } from '../TextField/TextField.js'
import { tasksStore } from '../../stores/tasks.js'
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
  const inputElement = useRef(null)

  const handleItemOutsideClick = useCallback(
    (event: MouseEvent) => {
      if (event.target === inputElement.current) return

      setEditableItemId('')
      document.removeEventListener('click', handleItemOutsideClick)
    },
    [inputElement]
  )

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
            event.preventDefault()
          }}
          onDoubleClick={() => {
            setEditableItemId(id)
            setEditableInitialValue(text)

            document.addEventListener('click', handleItemOutsideClick)
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
      <TextField
        id="edit-task"
        label="Edit task"
        hiddenLabel
        theme="default"
        className={styles.textInput}
        value={text}
        ref={inputElement}
        onKeyDown={event => {
          if (event.key === 'Escape') {
            changeSyncMapById(client, tasksStore, id, {
              text: editableInitialValue
            })

            setEditableItemId('')
          } else if (event.key === 'Enter') {
            setEditableItemId('')
          }
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
