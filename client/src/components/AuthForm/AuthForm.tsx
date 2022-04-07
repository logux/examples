import { useCallback, useState } from 'react'

import { auth } from '../../stores/auth.js'
import { TextField } from '../TextField/TextField.js'
import styles from './AuthForm.module.css'

export const AuthForm = (): JSX.Element => {
  const [login, setLogin] = useState('admin')
  const [password, setPassword] = useState('admin')

  const handleLoginChange = useCallback(event => {
    setLogin(event.target.value)
  }, [])

  const handlePasswordChange = useCallback(event => {
    setPassword(event.target.value)
  }, [])

  const handleSubmit = useCallback(event => {
    event.preventDefault()
    auth({
      name: event.currentTarget.login.value,
      password: event.currentTarget.password.value
    })
  }, [])

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.field}>
        <TextField
          id="login"
          label="Login:"
          theme="default"
          value={login}
          onChange={handleLoginChange}
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
          onChange={handlePasswordChange}
        />
      </div>
      <div className={styles.action}>
        <button>Sign in</button>
      </div>
    </form>
  )
}
