'use client'

import { useSetAtom } from 'jotai'
import { FunctionComponent, useState } from 'react'
import { blurInput, scrollToTabs } from '~/utils'
import Input from './input'
import { addTabAtom } from './stores/tab'

type BigSearchProps = {
  className?: string
}

const BigSearch: FunctionComponent<BigSearchProps> = () => {
  const [quest, setQuest] = useState('')
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
