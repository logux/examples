import cn from 'classnames'
import {
  ChangeEvent,
  ForwardedRef,
  forwardRef,
  useCallback,
  KeyboardEvent
} from 'react'

import styles from './TextInput.module.css'

type Props = {
  className?: string
  id: string
  label: string
  placeholder: string
  theme: 'default' | 'flat'
  value: string
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

export const TextInput = forwardRef(
  (
    {
      className,
      id,
      label,
      placeholder,
      theme,
      value,
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
      <input
        ref={ref}
        id={id}
        className={cn(
          styles.textInput,
          styles[`text-input_theme_${theme}`],
          className
        )}
        placeholder={placeholder}
        aria-label={label}
        onKeyDown={onKeyDown}
        onChange={handleChange}
        value={value}
      />
    )
  }
)
