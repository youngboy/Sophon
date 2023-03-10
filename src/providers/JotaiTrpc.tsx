import { createTRPCJotai } from 'jotai-trpc'
import { AppRouter } from '~/server/routers/_app'
import { httpBatchLink, loggerLink } from '@trpc/client'

function getBaseUrl() {
  if (typeof window !== 'undefined')
    // browser should use relative path
    return ''
  if (process.env.VERCEL_URL)
    // reference for vercel.com
    return `https://${process.env.VERCEL_URL}`
  if (process.env.RENDER_INTERNAL_HOSTNAME)
    // reference for render.com
    return `http://${process.env.RENDER_INTERNAL_HOSTNAME}:${process.env.PORT}`
  // assume localhost
  return `http://localhost:${process.env.PORT ?? 3000}`
}

export const jTrpc = createTRPCJotai<AppRouter>({
  links: [
    loggerLink({
      enabled: (opts) =>
        process.env.NODE_ENV === 'development' ||
        (opts.direction === 'down' && opts.result instanceof Error)
    }),
    httpBatchLink({ url: `${getBaseUrl()}/api/trpc` })
  ]
})
