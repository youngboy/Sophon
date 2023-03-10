import { FunctionComponent } from 'react'
import Icon from './Icon'
import Message from './message'

type UserMessageProps = {
  children: React.ReactNode
}

const UserMessage: FunctionComponent<UserMessageProps> = ({ children }) => {
  return (
    <Message toLeft>
      <div className="px-4 flex items-start gap-2">
        <Icon xlink="ghost" className="w-5 h-[24px] min-w-[1.25rem] flex-shrink-0 text-red-500" />
        {children}
      </div>
    </Message>
  )
}

export default UserMessage
