import { z } from 'zod'
import { router, procedure } from '../../trpc'

export const tabRouter = router({
  create: procedure
    .input(
      z.object({
        text: z.string()
      })
    )
    .mutation(({ input }) => {
      return {
        greeting: `hello ${input.text}`
      }
    })
})
