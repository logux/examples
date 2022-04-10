import cn from 'classnames'
import {
  ChangeEvent,
  ForwardedRef,
  forwardRef,
  KeyboardEvent,
  useCallback
} from 'react'

import styles from './TextField.module.css'

type Props = {
  value: string
  id: string
  className?: string
  label: string
  placeholder?: string
  theme: 'default' | 'flat'
  hiddenLabel?: boolean
  type?: string
  autoComplete?: string
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

export const TextField = forwardRef(
  (
    {
      className,
      id,
      label,
      placeholder,
      theme,
      hiddenLabel,
      value,
      type,
      autoComplete,
      onChange,
      onKeyDown
    }: Props,
    ref: ForwardedRef<HTMLInputElement>
  ): JSX.Element => {
    const handleChange = useCallback(
      (event: ChangeEvent<HTMLInputElement>) => {
        onChange(event)
      },
      [onChange]
    )

    return (
      <div
        className={cn(styles.field, styles[`field_theme_${theme}`], className)}
      >
        {!hiddenLabel && <label className={styles.label}>{label}</label>}
        <input
          value={value}
          ref={ref}
          id={id}
          type={type ?? 'text'}
          autoComplete={autoComplete}
          className={styles.input}
          placeholder={placeholder}
          aria-label={label}
          onKeyDown={onKeyDown}
          onChange={handleChange}
        />
      </div>
    )
  }
)
