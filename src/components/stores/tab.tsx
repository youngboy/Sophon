import { atom } from 'jotai'
import { atomWithStorage, useHydrateAtoms } from 'jotai/utils'
import BotMessage from '../botMessage'
import DataMessage from '../dataMessage'
import UserMessage from '../userMessage'

const CmpMap: any = {
  bot: BotMessage,
  user: UserMessage,
  data: DataMessage
}

function getMessageNodes(message: any[]) {
  return message.map(
    (
      m: {
        type: string
        props: any
      },
      index
    ) => {
      const Cmp = CmpMap[m.type]
      return <Cmp key={index} {...m.props} />
    }
  )
}

const testTab = {
  title: '标签 1',
  messages: [
    {
      type: 'bot',
      props: {
        children: `
          <span class="flex-shrink-0">你似乎想知道</span>
          <span class="font-semibold text-red-400">
            "过去一个星期的咨询会话里面，哪些是客服可以改进的"
          </span>
          `
      }
    },
    {
      type: 'data',
      props: {}
    },
    {
      type: 'bot',
      props: {
        children: '好的，请提供你账号绑定的手机号'
      }
    },
    {
      type: 'user',
      props: {
        children: '1200000000'
      }
    },
    {
      type: 'bot',
      props: {
        children: '好的，请提供你账号绑定的邮箱'
      }
    }
  ]
}

// export const tabAtom = atomWithStorage<(typeof testTab)[]>('insight:tabs-session', [testTab])
export const tabAtom = atom<(typeof testTab)[]>([testTab])
export const activeTabAtom = atom('')
export const tabWithNodesAtom = atom((get) => {
  const tabs = get(tabAtom)
  return tabs.map((t) => {
    return {
      ...t,
      nodes: getMessageNodes(t.messages)
    }
  })
})
export const addTabAtom = atom(null, (get, set, update: typeof testTab) => {
  const tabs = get(tabAtom)
  const newUpdate = {
    ...update,
    title: `标签 ${tabs.length + 1}`
  }
  set(tabAtom, [...tabs, newUpdate])
  set(activeTabAtom, newUpdate.title)
})
