import { atom, Getter, Setter } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import { jTrpc } from '~/providers/JotaiTrpc'
import {
  createMessage,
  createTab,
  MessageMode,
  TabModel,
  testTab
} from '~/server/routers/subRouters/tab.model'
import { scrollToMain, scrollToTabs } from '~/utils'
import BotMessage from '../botMessage'
import DataMessage from '../dataMessage'
import UserMessage from '../userMessage'

const CmpMap: any = {
  bot: BotMessage,
  user: UserMessage,
  data: DataMessage
}

function getMessageNodes(message: any[]) {
  return message.map((m: MessageMode) => {
    const Cmp = CmpMap[m.type]
    return <Cmp key={m.id} {...m.props} />
  })
}

function replaceTabs(resp: TabModel, get: Getter, set: Setter) {
  // replace tabs
  set(
    tabAtom,
    get(tabAtom).map((t) => {
      if (t.id === resp.id) {
        return resp
      }
      return t
    })
  )
}

const persist = false
const postTabAtom = jTrpc.tab.post.atomWithMutation()
export const tabAtom = persist
  ? atomWithStorage<TabModel[]>('insight:tabs-session', [])
  : atom<TabModel[]>([testTab])
export const tabWithNodesAtom = atom((get) => {
  const tabs = get(tabAtom)
  return tabs.map((t) => {
    return {
      ...t,
      nodes: getMessageNodes(t.messages)
    }
  })
})
export const activeTabAtomId = atom('')
export const activeTabAtom = atom(
  (get) => {
    const id = get(activeTabAtomId)
    const tabs = get(tabAtom)
    return tabs.find((i) => i.id === id)
  },
  (get, set, update: string) => {
    set(activeTabAtomId, update)
  }
)

// I know! horrible hum ? without benefit from react-query & atomic at all
// FIXME: let's fix later, time is rushing
export const addTabAtom = atom(null, (get, set, update: string) => {
  const tabs = get(tabAtom)
  const newTab = createTab(update)
  const newUpdate: TabModel = {
    ...newTab,
    title: `标签 ${tabs.length + 1}`
  }

  // optimistic update
  set(tabAtom, [...tabs, newUpdate])
  set(activeTabAtomId, newUpdate.id)

  set(postTabAtom, [newUpdate]).then((resp) => {
    replaceTabs(resp, get, set)
  })
})

const sendMsgAtom = jTrpc.tab.sendMsg.atomWithMutation()
export const replyTabAtom = atom(null, (get, set, update: string) => {
  const tabs = get(tabAtom)
  const activeTabId = get(activeTabAtomId)
  const activeTab = tabs.find((f) => activeTabId === f.id)
  if (!activeTab) {
    throw new Error('no tab found in current page')
  }

  // optimistic update
  const newTab: TabModel = {
    ...activeTab,
    messages: [
      ...activeTab.messages,
      createMessage('user', {
        children: update
      })
    ]
  }
  replaceTabs(newTab, get, set)

  set(sendMsgAtom, [newTab]).then((resp) => {
    replaceTabs(resp, get, set)
  })
})

export const closeCurrentTabAtom = atom(null, (get, set, update: boolean) => {
  const currentTab = get(activeTabAtom)
  const tabs = get(tabAtom)
  set(activeTabAtomId, tabs.find((t) => t.id !== currentTab?.id)?.id || '')
  const newTabs = tabs.filter((t) => t.id !== currentTab?.id)
  set(tabAtom, newTabs)
  if (newTabs.length > 0) {
    scrollToTabs()
  } else {
    scrollToMain()
  }
})
