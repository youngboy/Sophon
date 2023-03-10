export type MessageMode = {
  id: string
  status?: string
  type: string
  props: any
}
export type TabModel = {
  title: string
  id: string
  status: string
  messages: MessageMode[]
}

export function createTab(quest: string): TabModel {
  return {
    title: `标签`,
    id: `${Date.now()}`,
    status: 'loading',
    messages: [
      createMessage('bot', {
        children: `
      <span class="flex-shrink-0">你似乎想知道</span>
      <span class="font-semibold text-red-400">
        "${quest}"
      </span>
      `
      })
    ]
  }
}

export function createMessage(type: string, props: any) {
  return {
    id: `${Date.now()}`,
    status: 'loading',
    type,
    props
  }
}

export const testTab = {
  title: '标签 1',
  id: `${Date.now()}`,
  status: 'finish',
  messages: [
    {
      id: '1',
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
      id: '2',
      type: 'data',
      props: {}
    },
    {
      id: '3',
      type: 'bot',
      props: {
        children: '好的，请提供你账号绑定的手机号'
      }
    },
    {
      id: '4',
      type: 'user',
      props: {
        children: '1200000000'
      }
    },
    {
      id: '5',
      type: 'bot',
      props: {
        children: '好的，请提供你账号绑定的邮箱'
      }
    }
  ]
}
