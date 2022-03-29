import styles from './ControlPanel.module.css'

export const ControlPanel = (): JSX.Element => {
  return (
    <footer className={styles.controlPanel}>
      <span className={styles.itemsCount}>0 item left</span>
      <ul className={styles.filters}>
        <li className={styles.filtersItem}>
          <button type="button" className={styles.filtersItemContent}>
            All
          </button>
        </li>
        <li className={styles.filtersItem}>
          <button type="button" className={styles.filtersItemContent}>
            Active
          </button>
        </li>
        <li className={styles.filtersItem}>
          <button type="button" className={styles.filtersItemContent}>
            Completed
          </button>
        </li>
      </ul>
      <button type="button" className={styles.clearAction}>
        Clear completed
      </button>
    </footer>
  )
}
