import cn from 'classnames'

import styles from './TextInput.module.css'

type Props = {
  theme: 'default' | 'flat'
}

export const TextInput = ({ theme }: Props): JSX.Element => {
  return (
    <input
      className={cn(styles.textInput, styles[`text-input_theme_${theme}`])}
      placeholder="What needs to be done?"
    />
  )
}
