'use client'

import clsx from 'clsx'
import { FunctionComponent, useEffect } from 'react'
import style from './themeSwitch.module.css'

type ThemeSwitchProps = {
  className?: string
}

const storageKey = 'theme-preference'

const getColorPreference = () => {
  if (typeof localStorage === 'undefined') {
    return 'dark'
  }
  if (localStorage.getItem(storageKey)) return localStorage.getItem(storageKey)
  else return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

const theme = {
  value: getColorPreference() as any
}

const setPreference = () => {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(storageKey, theme.value)
  }
  reflectPreference()
}

const reflectPreference = () => {
  document.firstElementChild?.setAttribute('data-theme', theme.value)

  document.querySelector('#theme-toggle')?.setAttribute('aria-label', theme.value)
}

// set early so no page flashes / CSS is made aware
// need to place on layout.tsx ?
// reflectPreference()

// sync with system changes

const ThemeSwitch: FunctionComponent<ThemeSwitchProps> = (props) => {
  useEffect(() => {
    reflectPreference()
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', ({ matches: isDark }) => {
        theme.value = isDark ? 'dark' : 'light'
        setPreference()
      })
  }, [])
  return (
    <button
      className={clsx(style['theme-toggle'], props.className)}
      id="theme-toggle"
      title="Toggles light & dark"
      aria-label="auto"
      aria-live="polite"
      onClick={() => {
        theme.value = theme.value === 'light' ? 'dark' : 'light'

        setPreference()
      }}>
      <svg
        className={style['sun-and-moon']}
        aria-hidden="true"
        width="24"
        height="24"
        viewBox="0 0 24 24">
        <mask className={style['moon']} id="moon-mask">
          <rect x="0" y="0" width="100%" height="100%" fill="white" />
          <circle cx="24" cy="10" r="6" fill="black" />
        </mask>
        <circle
          className={style['sun']}
          cx="12"
          cy="12"
          r="6"
          mask="url(#moon-mask)"
          fill="currentColor"
        />
        <g className={style['sun-beams']} stroke="currentColor">
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </g>
      </svg>
    </button>
  )
}

export default ThemeSwitch
