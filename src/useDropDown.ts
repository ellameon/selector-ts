import { MouseEvent, useState } from "react"

export function useDropDown(): {
  elementLeft: number
  elementHeight: number
  elementRight: number
  elementBottom: number
  onOpenSelector: (e: MouseEvent) => void
} {

  const [elementLeft, setElementLeft] = useState(0)
  const [elementHeight, setElementHeight] = useState(0)
  const [elementRight, setElementRight] = useState(0)
  const [elementBottom, setElementBottom] = useState(0)

  const onOpenSelector = (e: MouseEvent) => {
    if (e.target === null) {
      return
    }
    if (!(e.target instanceof HTMLElement)) {
      return
    }
    const element = e.target.getBoundingClientRect()
    setElementBottom(element.top)
    setElementLeft(element.x)
    setElementHeight(element.bottom - element.top)
    setElementRight(element.right)
  }

  return {
    elementLeft: elementLeft,
    elementHeight: elementHeight,
    elementRight: elementRight,
    elementBottom: elementBottom,
    onOpenSelector,
  }
}
