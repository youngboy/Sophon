import { z } from 'zod'
import { GuideAI, callComp, ResponseAI } from '~/server/ai'
import { router, procedure } from '../../trpc'
import { createMessage, TabModel } from './tab.model'

function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, ms)
  })
}

const zTab = z.object({
  id: z.string(),
  title: z.string(),
  messages: z.array(z.any())
})

export const tabRouter = router({
  post: procedure.input(zTab).mutation(async ({ input }) => {
    await sleep(1200)

    const lastMsg = input.messages[input.messages.length - 1]
    let msg = { response: '内部错误', forwardToAI: '' }
    try {
      msg = await GuideAI(input, lastMsg, false)
    } catch (e) {
      console.error(e)
    }

    return {
      tab: {
        ...input,
        messages: [
          ...input.messages,
          createMessage('bot', {
            subType: 'GuideAI',
            children: msg.response,
            raw: JSON.stringify(msg)
          })
        ]
      },
      forwardToAI: msg.forwardToAI
    }
  }),
  sendMsg: procedure.input(zTab).mutation(async ({ input }) => {
    await sleep(1200)

    const lastMsg = input.messages[input.messages.length - 1]
    const botMsg = input.messages.filter((i) => i.type === 'bot')
    const lastBotMsg = botMsg[botMsg.length - 1]
    let replacePending = false
    let respondAI = lastBotMsg?.props?.processedAI || 'GuideAI'
    if (lastMsg?.props?.pending && lastMsg.props.subType) {
      replacePending = true
      respondAI = lastMsg.props.subType
    }

    let msg = { plot: null, response: '内部错误', forwardToAI: '', processedAI: '' }
    try {
      msg = await ResponseAI(input, lastMsg, respondAI, replacePending)
    } catch (e) {
      console.error(e)
    }

    const message = createMessage(msg.plot ? 'data' : 'bot', {
      subType: respondAI,
      children: msg.response,
      plot: msg.plot,
      processedAI: msg.processedAI,
      raw: JSON.stringify(msg)
    })
    if (replacePending) {
      return {
        tab: {
          ...input,
          messages: input.messages
            .filter((i, index) => lastMsg.id && i.id !== lastMsg.id)
            .concat({
              ...message,
              id: lastMsg.id
            })
        },
        forwardToAI: msg.forwardToAI
      }
    }
    return {
      tab: {
        ...input,
        messages: [...input.messages, message]
      },
      forwardToAI: msg.forwardToAI
    }
  })
})
