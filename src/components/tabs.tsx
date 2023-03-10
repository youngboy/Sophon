'use client'

import * as RTabs from '@radix-ui/react-tabs'
import { useAtom, useAtomValue } from 'jotai'
import { useHydrateAtoms } from 'jotai/utils'
import { useEffect } from 'react'

import Reply from './reply'
import { tabWithNodesAtom, activeTabAtom } from './stores/tab'

export default function Tabs() {
  const tabs = useAtomValue(tabWithNodesAtom)
  const [activeTab, setTab] = useAtom(activeTabAtom)
  useEffect(() => {
    setTab(tabs[0].title)
  }, [])

  if (tabs.length < 1) {
    return null
  }
  return (
    <RTabs.Root className="TabsRoot" value={activeTab} onValueChange={setTab}>
      <RTabs.List className="border-b flex flex-nowrap items-center" aria-label="Manage your list">
        {tabs.map((t) => (
          <RTabs.Trigger
            key={t.title}
            className={`py-2 px-3 rounded-t-md border border-b-0 flex items-center ${
              activeTab === t.title ? ' bg-surface-2 border-surface-3' : 'border-transparent'
            }`}
            value={t.title}>
            {t.title}
          </RTabs.Trigger>
        ))}
      </RTabs.List>
      {tabs.map((t) => {
        return (
          <RTabs.Content key={t.title} className="pb-12 cursor-default" value={t.title}>
            {t.nodes}
            <Reply />
          </RTabs.Content>
        )
      })}
    </RTabs.Root>
  )
}