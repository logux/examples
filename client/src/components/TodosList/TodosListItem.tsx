import cn from 'classnames'
import { useClient } from '@logux/client/react'
import { changeSyncMapById, deleteSyncMapById } from '@logux/client'
import { KeyboardEvent, useCallback, useRef, useState } from 'react'

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

  const handleItemClick = useCallback(event => {
    event.preventDefault()
  }, [])

  const handleItemDoubleClick = useCallback(() => {
    setEditableItemId(id)
    setEditableInitialValue(text)

    document.addEventListener('click', handleItemOutsideClick)
  }, [id, text, editableItemId])

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Escape') {
        changeSyncMapById(client, tasksStore, id, {
          text: editableInitialValue
        })

        setEditableItemId('')
      } else if (event.key === 'Enter') {
        setEditableItemId('')
      }
    },
    [id, editableItemId, editableInitialValue, client]
  )

  const handleItemOutsideClick = useCallback(
    event => {
      if (event.target === inputElement.current) return

      setEditableItemId('')
      document.removeEventListener('click', handleItemOutsideClick)
    },
    [inputElement]
  )

  const handleDeleteClick = useCallback(() => {
    deleteSyncMapById(client, tasksStore, id)
  }, [client, tasksStore, id])

  const handleCompletionChange = useCallback(event => {
    changeSyncMapById(client, tasksStore, id, {
      completed: Boolean(event.target.checked)
    })
  }, [])

  const handleTextChange = useCallback(
    event => {
      changeSyncMapById(client, tasksStore, id, {
        text: event.target.value
      })
    },
    [client, tasksStore, id]
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
          onChange={handleCompletionChange}
          checked={completed}
        />
        <label
          className={styles.label}
          htmlFor={`todo-${id}`}
          onClick={handleItemClick}
          onDoubleClick={handleItemDoubleClick}
        >
          {text}
        </label>
        <button
          className={styles.deleteControl}
          type="button"
          onClick={handleDeleteClick}
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
        onKeyDown={handleKeyDown}
        onChange={handleTextChange}
      />
    </li>
  )
}
