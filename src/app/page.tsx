import Tabs from '~/components/tabs'
import ThemeSwitch from '~/components/themeSwitch'
import BigSearch from '~/components/bigSearch'
import HotList from '~/components/hotList'

export default function Home() {
  return (
    <main
      id="main-wrapper"
      className="scroll-smooth lg:max-w-[900px] min-h-[157vh] mx-auto relative flex w-full flex-col items-stretch px-4">
      <div className="h-14 flex items-center">
        <ThemeSwitch className="ml-auto" />
      </div>
      <div className="pt-16 max-sm:pt-4 sm:px-6 mb-8 flex flex-col justify-center items-center">
        <div className="flex items-center leading-[1.5] max-sm:text-3xl text-4xl text-text-1">
          <svg
            className="stroke-brand w-9 h-9 mr-3"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round">
            <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"></path>
          </svg>
          智子 - 商家助理
        </div>
        <div className="flex items-center gap-1">
          使用交谈的方式探索后台和发起疑问
          <span className="max-sm:hidden flex gap-1 items-center">
            {' '}
            - 由 OpenAI
            <svg
              className="w-[18px] h-[18px] fill-current"
              data-name="OpenAI Logo"
              viewBox="140 140 520 520">
              <path
                id="logo"
                d="m617.24 354a126.36 126.36 0 0 0 -10.86-103.79 127.8 127.8 0 0 0 -137.65-61.32 126.36 126.36 0 0 0 -95.31-42.49 127.81 127.81 0 0 0 -121.92 88.49 126.4 126.4 0 0 0 -84.5 61.3 127.82 127.82 0 0 0 15.72 149.86 126.36 126.36 0 0 0 10.86 103.79 127.81 127.81 0 0 0 137.65 61.32 126.36 126.36 0 0 0 95.31 42.49 127.81 127.81 0 0 0 121.96-88.54 126.4 126.4 0 0 0 84.5-61.3 127.82 127.82 0 0 0 -15.76-149.81zm-190.66 266.49a94.79 94.79 0 0 1 -60.85-22c.77-.42 2.12-1.16 3-1.7l101-58.34a16.42 16.42 0 0 0 8.3-14.37v-142.39l42.69 24.65a1.52 1.52 0 0 1 .83 1.17v117.92a95.18 95.18 0 0 1 -94.97 95.06zm-204.24-87.23a94.74 94.74 0 0 1 -11.34-63.7c.75.45 2.06 1.25 3 1.79l101 58.34a16.44 16.44 0 0 0 16.59 0l123.31-71.2v49.3a1.53 1.53 0 0 1 -.61 1.31l-102.1 58.95a95.16 95.16 0 0 1 -129.85-34.79zm-26.57-220.49a94.71 94.71 0 0 1 49.48-41.68c0 .87-.05 2.41-.05 3.48v116.68a16.41 16.41 0 0 0 8.29 14.36l123.31 71.19-42.69 24.65a1.53 1.53 0 0 1 -1.44.13l-102.11-59a95.16 95.16 0 0 1 -34.79-129.81zm350.74 81.62-123.31-71.2 42.69-24.64a1.53 1.53 0 0 1 1.44-.13l102.11 58.95a95.08 95.08 0 0 1 -14.69 171.55c0-.88 0-2.42 0-3.49v-116.68a16.4 16.4 0 0 0 -8.24-14.36zm42.49-63.95c-.75-.46-2.06-1.25-3-1.79l-101-58.34a16.46 16.46 0 0 0 -16.59 0l-123.31 71.2v-49.3a1.53 1.53 0 0 1 .61-1.31l102.1-58.9a95.07 95.07 0 0 1 141.19 98.44zm-267.11 87.87-42.7-24.65a1.52 1.52 0 0 1 -.83-1.17v-117.92a95.07 95.07 0 0 1 155.9-73c-.77.42-2.11 1.16-3 1.7l-101 58.34a16.41 16.41 0 0 0 -8.3 14.36zm23.19-50 54.92-31.72 54.92 31.7v63.42l-54.92 31.7-54.92-31.7z"></path>
            </svg>
            支持
          </span>
        </div>
      </div>
      <div className="relative w-full md:pr-[250px] lg:pr-[276px] xl:pr-[20vw] pb-12">
        <div className="md:translate-x-[125px] lg:translate-x-[138px] xl:translate-x-[10vw]">
          <BigSearch />
          <div className="pt-8">
            <div className="text-text-1 mb-3 pl-2">💡 热门问题</div>
            <HotList />
          </div>
        </div>
      </div>
      <div id="tab-wrapper" className="pt-3">
        <Tabs />
      </div>
    </main>
  )
}
