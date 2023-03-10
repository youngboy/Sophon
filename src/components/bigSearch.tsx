'use client'

import { useSetAtom } from 'jotai'
import { FunctionComponent, useCallback, useState } from 'react'
// import { trpc } from '~/providers/trpcProvider'
import Input from './input'
import { addTabAtom } from './stores/tab'

type BigSearchProps = {
  className?: string
}

const BigSearch: FunctionComponent<BigSearchProps> = () => {
  // const hello = trpc.tab.create.useMutation()
  const [quest, setQuest] = useState('')
  const setAtom = useSetAtom(addTabAtom)
  const handleSubmit = useCallback(
    (val: string) => {
      setAtom({
        title: `标签`,
        messages: [
          {
            type: 'bot',
            props: {
              children: `
            <span class="flex-shrink-0">你似乎想知道</span>
            <span class="font-semibold text-red-400">
              "${val}"
            </span>
            `
            }
          }
        ]
      })
    },
    [setAtom]
  )
  return (
    <Input
      placeholder="键入商家的任意问题 😊"
      style={{ height: '30px' }}
      className="p-3 text-xl"
      value={quest}
      onValueChange={setQuest}
      onSubmit={() => {
        handleSubmit(quest)
        setQuest('')
        if (document.activeElement instanceof HTMLElement) {
          document.activeElement.blur()
        }
        if (location.hash === '#tab-wrapper') {
          location.hash = '#'
        }
        location.hash = '#tab-wrapper'
      }}
    />
  )
}

export default BigSearch
