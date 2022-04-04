import { useCallback, useState } from 'react'

import { auth } from '../../stores/auth.js'
import { TextInput } from '../TextInput/TextInput.js'
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
        <label className={styles.label}>Login:</label>
        <TextInput
          id="login"
          label="login"
          placeholder="Enter your login"
          theme="default"
          value={login}
          onChange={handleLoginChange}
        />
      </div>
      <div className={styles.field}>
        <label className={styles.label}>Password:</label>
        <TextInput
          id="password"
          label="password"
          placeholder="Enter your password"
          theme="default"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      <div className={styles.action}>
        <button>Sign in</button>
      </div>
    </form>
  )
}
