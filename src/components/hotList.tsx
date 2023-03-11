'use client'
import styles from './hotList.module.css'
import { FunctionComponent } from 'react'
import Icon from './Icon'
import { useSetAtom } from 'jotai'
import { setHotQuestAtom } from './stores/tab'

const labelMeta: Record<string, string> = {
  店铺入驻: 'violet',
  会话分析: 'red',
  订单分析: 'green',
  企业号入驻: 'blue'
}
const hotQuestions = [
  {
    quest: '我们 Benz 旗舰店想入驻，需要怎么做材料',
    label: '店铺入驻'
  },
  {
    quest: '过去一个星期的咨询会话里面，哪些是客服可以改进的',
    label: '会话分析'
  },
  {
    quest: '近 30 天在售前场景流失的客户原因有哪些',
    label: '会话分析'
  },
  {
    quest: '上个季度热销的产品有什么共同点',
    label: '订单分析'
  },
  {
    quest: '如何开通企业专业号，有什么优势',
    label: '企业号入驻'
  }
].map((i) => {
  return {
    ...i,
    style: {
      '--label-color-name': `var(--${labelMeta[i.label]}-6-hsl)`
    } as any
  }
})

type HotListProps = {
  className?: string
}

const HotList: FunctionComponent<HotListProps> = (props) => {
  const setHot = useSetAtom(setHotQuestAtom)
  return (
    <ol>
      {hotQuestions.map((item) => (
        <li
          onClick={() => {
            setHot(item.quest)
          }}
          className="cursor-pointer items-start w-full py-2 flex  gap-2"
          key={item.quest}>
          <Icon xlink="flame" className="w-4 h-[21px] text-red-400 " />
          <div className="hover:text-link text-sm leading-[1.5]">{item.quest}</div>
          <div
            className={`text-xs flex-shrink-0 rounded-full border py-1 px-2 leading-[1] ${styles.label}`}
            style={item.style}>
            {item.label}
          </div>
        </li>
      ))}
    </ol>
  )
}

export default HotList
