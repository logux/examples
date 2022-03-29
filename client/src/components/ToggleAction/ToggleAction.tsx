import styles from './ToggleAction.module.css'

export const ToggleAction = (): JSX.Element => {
  return (
    <>
      <input id="toggle-all" className={styles.toggleAction} type="checkbox" />
      <label htmlFor="toggle-all" className={styles.toggleActionLabel}>
        Mark all as complete
      </label>
    </>
  )
}
