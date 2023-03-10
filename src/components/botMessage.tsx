import { FunctionComponent } from 'react'
import Icon from './Icon'
import Message from './message'

type BotMessageProps = {
  children: string
}

const BotMessage: FunctionComponent<BotMessageProps> = ({ children }) => {
  return (
    <Message>
      <div className="px-4 flex items-start gap-2">
        <Icon xlink="bot" className="w-5 h-[24px] min-w-[1.25rem] flex-shrink-0 text-brand" />
        <div dangerouslySetInnerHTML={{ __html: children }} />
      </div>
    </Message>
  )
}

export default BotMessage
