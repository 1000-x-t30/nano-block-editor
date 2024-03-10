import { FC, ReactNode } from 'react'

interface Props {
  title: string
  ariaLabel: string
  ariaChecked: boolean
  onClick: () => void
  children: ReactNode
}

export const CheckButton: FC<Props> = (props: Props) => {
  const { title, ariaLabel, ariaChecked, onClick, children } = props
  

  return (
    <button
      type="button"
      role="checkbox"
      title={title}
      aria-label={ariaLabel}
      aria-checked={ariaChecked}
      onClick={onClick}>
    {children}
    </button>
  )
}