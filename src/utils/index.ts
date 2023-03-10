export function scrollToId(id: string) {
  if (location.hash === `#${id}`) {
    location.hash = '#'
  }
  location.hash = `#${id}`
}

export function scrollToTabs() {
  scrollToId('tab-wrapper')
}
export function scrollToMain() {
  scrollToId('main-wrapper')
}

export function blurInput() {
  if (document.activeElement instanceof HTMLElement) {
    document.activeElement.blur()
  }
}
