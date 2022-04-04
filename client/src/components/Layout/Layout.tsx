import { ReactNode } from 'react'
import { Link } from 'wouter'
import { useStore } from '@nanostores/react'

import { authStore } from '../../stores/auth.js'
import styles from './Layout.module.css'

type Props = {
  children: ReactNode
}

export const Layout = ({ children }: Props): JSX.Element => {
  const { id: userId } = useStore(authStore)

  return (
    <div className={styles.layout}>
      <header>
        <h1 className={styles.title}>todos</h1>
      </header>

      <main>{children}</main>

      <footer className={styles.footer}>
        {userId && (
          <>
            <p>
              <Link className={styles.footerLink} to="/logout">
                Logout
              </Link>
            </p>
            <p>Double-click to edit a todo</p>
          </>
        )}
        <p>
          Template by{' '}
          <a className={styles.footerLink} href="https://sindresorhus.com">
            Sindre Sorhus
          </a>
        </p>
        <p>
          Part of{' '}
          <a className={styles.footerLink} href="https://todomvc.com">
            TodoMVC
          </a>
        </p>
      </footer>
    </div>
  )
}
