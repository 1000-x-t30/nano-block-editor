import { FC } from 'react'

interface Props {
  label: string
  onClick: () => void
}

export const SaveButton: FC<Props> = (props: Props) => {
  const { label, onClick } = props
  

  return (
    <button
      className="nbe-save-button"
      type="button"
      role="save"
      onClick={onClick}>
      {label}
    </button>
  )
}