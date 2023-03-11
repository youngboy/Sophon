export type MessageMode = {
  id: string
  type: string
  props: {
    processedAI?: string
    pending?: boolean
    plot?: {
      metric: string
      data: number[]
      labels: string[]
    }
    subType?: string
    children?: any
    data?: any
    raw?: string
  }
}
export type TabModel = {
  title: string
  id: string
  quest: string
  messages: MessageMode[]
}

export function createTab(quest: string): TabModel {
  return {
    title: `标签`,
    id: `${Date.now()}`,
    quest,
    messages: [
      createMessage('bot', {
        raw: quest,
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
    type,
    props
  }
}

export const testTab = {
  title: '标签 1',
  quest: '过去一个星期的咨询会话里面，哪些是客服可以改进的',
  id: `${Date.now()}`,
  messages: [
    {
      id: '1',
      type: 'bot',
      props: {
        raw: '过去一个星期的咨询会话里面，哪些是客服可以改进的',
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
      props: {
        plot: {
          metric: '标签分类数量分布',
          data: [12, 14, 15, 18, 17],
          labels: ['付款问题', '发货延迟', '取消退款问题', '换货问题', '产品质量问题']
        }
      }
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
