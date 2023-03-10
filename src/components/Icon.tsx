import { FunctionComponent } from 'react'

type IconProps = {
  xlink: string
  className?: string
  onClick?: () => void
}

const Icon: FunctionComponent<IconProps> = (props) => {
  return (
    <svg
      className={props.className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      onClick={props.onClick}>
      <use xlinkHref={`#${props.xlink}`}></use>
    </svg>
  )
}

export default Icon
