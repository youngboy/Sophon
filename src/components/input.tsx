'use client'

import clsx from 'clsx'
import { useAtom } from 'jotai'
import { FunctionComponent, useEffect, useState } from 'react'
import Icon from './Icon'
import { loadingAtom } from './stores/tab'

type InputProps = {
  placeholder: string
  className: string
  iconClassName?: string
  style?: any
  value?: string
  onValueChange?: (v: string) => void
  onSubmit?: () => void
}

const Input: FunctionComponent<InputProps> = (props) => {
  const [enterVisible, setEnterVisible] = useState(false)
  const [composing, setCompose] = useState(false)
  const [loading] = useAtom(loadingAtom)
  useEffect(() => {
    setEnterVisible((props.value?.length || -1) > 0)
  }, [props.value])
  return (
    <label
      className={clsx(
        'relative inline-flex w-full cursor-text items-center rounded-md bg-surface-3  outline-brand transition-[outline-offset] focus-within:outline focus-within:outline-offset-4',
        props.className
      )}>
      <textarea
        name="prompt"
        className={clsx(
          'm-0 pr-7 bg-transparent cursor-text block h-auto w-full min-w-0 resize-none overflow-hidden bg-none p-0 text-current outline-none',
          {
            'cursor-progress': loading
          }
        )}
        disabled={loading}
        placeholder={props.placeholder}
        style={props.style}
        value={props.value}
        onKeyDown={(e) => {
          const isEnter = !e.shiftKey && e.key === 'Enter'
          if (isEnter) {
            e.preventDefault()
            if (!composing && (props.value || '').trim().length > 0) {
              props.onSubmit?.()
            }
          }
        }}
        onCompositionStart={() => {
          setCompose(true)
        }}
        onCompositionEnd={() => {
          setCompose(false)
        }}
        onChange={(e) => {
          const val = e.target.value.trim()
          setEnterVisible(val.length > 0)
          props.onValueChange?.(val)
        }}
      />
      <Icon
        xlink="enter"
        onClick={() => {
          if ((props.value || '').trim().length > 0) {
            props.onSubmit?.()
          }
        }}
        className={clsx(
          'absolute cursor-pointer right-3 top-1/2 translate-y-[-50%] w-6 h-6',
          {
            hidden: !enterVisible
          },
          props.iconClassName
        )}
      />
    </label>
  )
}

export default Input
