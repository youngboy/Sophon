import { router } from '../trpc'
import { tabRouter } from './subRouters/tab.router'

export const appRouter = router({
  tab: tabRouter
})
// export type definition of API
export type AppRouter = typeof appRouter
