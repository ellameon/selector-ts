import React, {MouseEvent, useCallback, useEffect, useRef, useState} from "react";
import {useDropDown} from "./useDropDown";
import {autoUpdate, offset, size, useFloating} from "@floating-ui/react-dom-interactions";
import {EntityOption} from "./EntityOption";
import {SelectorRow} from "./SelectorRow";

type Props = {
  entityArray: Array<EntityOption>
  buttonText?: string
  onSelect: (id: number) => void
  setOffset: (offset: number) => void
}

export const Selector = (function Selector(props: Props) {
  const {
    entityArray,
    buttonText,
    onSelect,
    setOffset,
  } = props

  const [open, setOpen] = useState(false)
  const {elementLeft, elementHeight, elementRight, onOpenSelector, elementBottom} = useDropDown()
  const display = open ? "unset" : "none"
  const width = String(elementRight - elementLeft)
  const [currentChunk, setCurrentChunk] = useState(0)
  const refVisible = useRef<HTMLDivElement | null>(null)
  const refEntityTable = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    function scrollHandler(e: Event) {
      const element = e.target
      if (element === null && refVisible === null && refEntityTable === null) {
        return
      }
      const height = refEntityTable.current!.offsetHeight
      const scrolled = refVisible!.current!.scrollTop
      const visibleHeight = refVisible!.current!.clientHeight
      const position = scrolled + visibleHeight
      if (position >= height - 10) {
        setCurrentChunk(prevState => prevState + 1)
        setOffset(currentChunk)
      }
      if (scrolled <= 10) {
        if (currentChunk <= 0) {
          return;
        }
        setCurrentChunk(prevState => prevState - 1)
        setOffset(currentChunk)
      }
    }

    refVisible.current?.addEventListener("scroll", scrollHandler)
    return () => {
      refVisible.current?.removeEventListener("scroll", scrollHandler)
    }
  })

  useEffect(() => {
    const escapeListener = (event: { code: string }) => {
      if (event.code === "Escape") {
        setOpen(false)
      }
    }
    window.addEventListener("keyup", escapeListener)
    return () => {
      window.removeEventListener("keyup", escapeListener)
    }
  }, [])

  const {reference, floating, strategy} = useFloating({
    open,
    onOpenChange: setOpen,
    middleware: [
      offset(0),
      size({
        apply({rects, availableHeight, elements}) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          Object.assign(elements.floating.style, {
            height: `${availableHeight > 400 ? 400 : availableHeight - 10}px`,
          })
        },
      }),
    ],
    whileElementsMounted: autoUpdate,
  })

  const selectorClick = useCallback(
    (e: MouseEvent) => {
      setOpen(true)
      onOpenSelector(e)
    },
    [setOpen, onOpenSelector],
  )

  const refForLoad = useCallback((element: HTMLDivElement | null) => {
    floating(element)
    refVisible.current = element
  }, [floating])

  return (
    <div>
      <button type="button" ref={reference} onClick={selectorClick} className="dropdown-button" >
        {buttonText}
      </button>
      <div className="dropdown-menu"
           ref={refForLoad}
           style={{
             top: elementBottom + elementHeight,
             left: elementLeft,
             position: strategy,
             display: display,
             width: (Number(width) - 2) +  "px",
             overflow: "auto",
             zIndex: 2000,
           }}
      >
        <div ref={refEntityTable}>
          {entityArray.map((entity) => (
            <SelectorRow key={entity.element} entity={entity} onClose={() => setOpen(false)} onSelect={onSelect}/>
          ))}
        </div>
      </div>
      {open && <div className="closeSelector" onClick={() => setOpen(false)}/>}
    </div>
  )
})
