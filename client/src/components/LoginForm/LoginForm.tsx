import { useState } from 'react'

import { auth } from '../../stores/auth.js'
import { TextField } from '../TextField/TextField.js'
import styles from './LoginForm.module.css'

export const LoginForm = (): JSX.Element => {
  const [login, setLogin] = useState('admin')
  const [password, setPassword] = useState('admin')

  return (
    <form
      onSubmit={event => {
        event.preventDefault()
        auth({
          name: event.currentTarget.login.value,
          password: event.currentTarget.password.value
        })
      }}
      className={styles.form}
    >
      <div className={styles.field}>
        <TextField
          id="login"
          label="Login:"
          theme="default"
          value={login}
          onChange={event => {
            setLogin(event.target.value)
          }}
          autoComplete="username"
        />
      </div>
      <div className={styles.field}>
        <TextField
          id="password"
          label="Password:"
          theme="default"
          value={password}
          type="password"
          autoComplete="current-password"
          onChange={event => {
            setPassword(event.target.value)
          }}
        />
      </div>
      <div className={styles.action}>
        <button>Sign in</button>
      </div>
    </form>
  )
}
