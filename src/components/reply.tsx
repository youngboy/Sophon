import React, { FunctionComponent, useState } from 'react'
import * as Select from '@radix-ui/react-select'
import Input from './input'
import clsx from 'clsx'
import Icon from './Icon'
import { useSetAtom } from 'jotai'
import { closeCurrentTabAtom, replyTabAtom } from './stores/tab'
import { blurInput } from '~/utils'

type ReplyProps = {}

type SelectItemProps = {
  children: React.ReactNode
  className?: string
  value: string
}
const SelectItem = React.forwardRef(
  ({ children, className, ...props }: SelectItemProps, forwardedRef: any) => {
    return (
      <Select.Item
        className={clsx(
          'text-text-1 px-3 py-1 rounded-md text-sm select-none hover:bg-surface-2',
          className
        )}
        value={props.value}
        ref={forwardedRef}>
        <Select.ItemText>{children}</Select.ItemText>
      </Select.Item>
    )
  }
)
SelectItem.displayName = 'SelectItem'

const Reply: FunctionComponent<ReplyProps> = (props) => {
  const [msg, setMsg] = useState('')
  const [rate, setState] = useState('')
  const reply = useSetAtom(replyTabAtom)
  const closeCurrentTab = useSetAtom(closeCurrentTabAtom)
  return (
    <div className="mt-12 flex justify-between gap-3">
      {rate ? (
        <button
          onClick={() => {
            closeCurrentTab(true)
          }}
          className="py-2 px-3 rounded-md whitespace-pre border border-red-500 flex items-center text-red-500">
          关闭标签
        </button>
      ) : (
        <Select.Root onValueChange={setState}>
          <Select.Trigger
            className="py-2 px-3 rounded-md whitespace-pre border border-red-500 flex items-center text-red-500"
            aria-label="closeCase">
            <Select.Value placeholder="结束咨询" />
            <Select.Icon className="ml-2">
              <Icon xlink="chevron-down" className="w-4 h-4" />
            </Select.Icon>
          </Select.Trigger>
          <Select.Portal>
            <Select.Content className="border-surface-3 border bg-surface-1 shadow-sm rounded-md">
              <Select.Viewport className="px-2 py-2">
                <Select.Group>
                  <Select.Label className="text-text-2 px-3 text-xs">结束咨询</Select.Label>
                  <hr className="mt-2 mb-2" />
                  <SelectItem value="good">不愧是你</SelectItem>
                  <SelectItem value="soso">我只是路过</SelectItem>
                  <SelectItem value="bad">人工智障</SelectItem>
                </Select.Group>
              </Select.Viewport>
            </Select.Content>
          </Select.Portal>
        </Select.Root>
      )}
      <Input
        className="p-2 w-2/3 max-w-2xl"
        style={{ height: '24px' }}
        placeholder="键入您的回复..."
        iconClassName="w-5 h-5"
        value={msg}
        onValueChange={setMsg}
        onSubmit={() => {
          reply({
            type: 'user',
            props: {
              children: msg
            }
          })
          setMsg('')
          blurInput()
        }}
      />
    </div>
  )
}

export default Reply
