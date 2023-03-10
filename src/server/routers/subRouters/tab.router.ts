import { z } from 'zod'
import { router, procedure } from '../../trpc'

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
  status: z.string(),
  messages: z.array(z.any())
})

export const tabRouter = router({
  post: procedure.input(zTab).mutation(async ({ input }) => {
    await sleep(1200)
    input.status = 'finish'
    return {
      ...input,
      status: 'finish'
    }
  }),
  sendMsg: procedure.input(zTab).mutation(async ({ input }) => {
    return input
  })
})
