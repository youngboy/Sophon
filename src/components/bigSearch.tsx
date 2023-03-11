'use client'

import { useAtom, useSetAtom } from 'jotai'
import { FunctionComponent } from 'react'
import { blurInput, scrollToTabs } from '~/utils'
import Input from './input'
import { addTabAtom, searchAtom } from './stores/tab'

type BigSearchProps = {
  className?: string
}

const BigSearch: FunctionComponent<BigSearchProps> = () => {
  const [quest, setQuest] = useAtom(searchAtom)
  const setAtom = useSetAtom(addTabAtom)
  return (
    <Input
      placeholder="键入商家的任意问题 😊"
      style={{ height: '30px' }}
      className="p-3 text-xl"
      value={quest}
      onValueChange={setQuest}
      onSubmit={() => {
        setAtom(quest)
        setQuest('')
        blurInput()
        scrollToTabs()
      }}
    />
  )
}

export default BigSearch
