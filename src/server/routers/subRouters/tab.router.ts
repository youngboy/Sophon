import { z } from 'zod'
import { callComp } from '~/server/ai'
import { router, procedure } from '../../trpc'
import { createMessage, TabModel } from './tab.model'

function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, ms)
  })
}

function getHisChats(tabData: TabModel) {
  let lastDirect = 'A'
  const msg = tabData.messages.reduce((acc, msg) => {
    lastDirect = msg.type === 'user' ? 'A' : 'Q'
    return `${acc}
${lastDirect}: ${msg.props.raw || msg.props.children}`
  }, '')
  return `${msg}
${lastDirect === 'A' ? 'Q' : 'A'}:`
}

const zTab = z.object({
  id: z.string(),
  title: z.string(),
  messages: z.array(z.any())
})

export const tabRouter = router({
  post: procedure.input(zTab).mutation(async ({ input }) => {
    await sleep(1200)

    const msg = await callComp(getHisChats(input))

    return {
      ...input,
      messages: [
        ...input.messages,
        createMessage('bot', {
          children: msg
        })
      ]
    }
  }),
  sendMsg: procedure.input(zTab).mutation(async ({ input }) => {
    await sleep(1200)
    const msg = await callComp(getHisChats(input))
    return {
      ...input,
      messages: [
        ...input.messages,
        createMessage('bot', {
          children: msg
        })
      ]
    }
  })
})
