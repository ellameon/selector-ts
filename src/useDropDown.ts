import { MouseEvent, useState } from "react"

export function useDropDown(): {
  buttonLeft: number
  buttonHeight: number
  buttonRight: number
  onOpenSelector: (e: MouseEvent) => void
} {
  const [showDropDown, setShowDropDown] = useState(false)
  const [buttonLeft, setButtonLeft] = useState(0)
  const [buttonHeight, setButtonHeight] = useState(0)
  const [buttonRight, setButtonRight] = useState(0)

  const onOpenSelector = (e: MouseEvent) => {
    if (e.target === null) {
      return
    }
    if (!(e.target instanceof HTMLElement)) {
      return
    }
    const element = e.target.getBoundingClientRect()
    setButtonLeft(element.x)
    setButtonHeight(element.bottom - element.top)
    setButtonRight(element.right)
    setShowDropDown(!showDropDown)
  }

  return {
    buttonLeft: buttonLeft,
    buttonHeight: buttonHeight,
    buttonRight: buttonRight,
    onOpenSelector,
  }
}
