import SvgIcons from '~/components/svgIcon'
import JotaiProvider from '../providers/JotaiProvider'
import { TRPCProvider } from '../providers/trpcProvider'
import './globals.css'

export const metadata = {
  title: '智子 - 商家助理',
  description:
    '一站式服务，使用交通的方式探索后台和发起疑问。Hackathon 参赛项目 POC。Thanks for the inspiration from OSS insight.io'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>
        <TRPCProvider>
          <JotaiProvider>{children}</JotaiProvider>
        </TRPCProvider>
        <SvgIcons />
      </body>
    </html>
  )
}
