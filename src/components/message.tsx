import clsx from 'clsx'
import { FunctionComponent } from 'react'

type MessageProps = {
  children: React.ReactNode
  toLeft?: boolean
}

const Message: FunctionComponent<MessageProps> = (props) => {
  return (
    <div
      className={clsx(
        'from-indigo-300/80 dark:from-indigo-500/80 to-surface-3 rounded-[6px] mt-3 p-[1px]',
        props.toLeft ? 'bg-gradient-to-l' : 'bg-gradient-to-r'
      )}>
      <div className="bg-surface-2 rounded-[5px] px-2 py-4">{props.children}</div>
    </div>
  )
}

export default Message
