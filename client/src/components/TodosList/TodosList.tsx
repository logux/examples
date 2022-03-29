import cn from 'classnames'

import { ControlPanel } from '../ControlPanel/ControlPanel'
import { TextInput } from '../TextInput/TextInput'
import { ToggleAction } from '../ToggleAction/ToggleAction'
import styles from './TodosList.module.css'

const temporaryTodos = [
  {
    id: '1',
    text: 'Create logux example app',
    completed: false
  },
  {
    id: '2',
    text: 'Enjoy of frontend',
    completed: true
  }
]

export const TodosList = (): JSX.Element => {
  return (
    <div className={styles.todosList}>
      <TextInput theme="flat" />

      <div className={styles.toggleAction}>
        <ToggleAction />
      </div>

      <ul className={styles.list}>
        {temporaryTodos.map(todo => (
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
