import {MouseEvent, useCallback, useEffect, useState} from "react";
import {useDropDown} from "./useDropDown";
import {autoUpdate, offset, size, useFloating} from "@floating-ui/react-dom-interactions";
import {EntityOption} from "./EntityOption";
import {SelectorRow} from "./SelectorRow";

type Props = {
  setInputValue?: (value: string) => void
  entityArray: Array<EntityOption>
  buttonText?: string
  onSelect: (id: number) => void
}

export const Selector = (function Selector(props: Props) {
  const {
    setInputValue,
    entityArray,
    buttonText,
    onSelect,
  } = props

  const [open, setOpen] = useState(false)
  const {buttonLeft, buttonHeight, buttonRight, onOpenSelector} = useDropDown()
  const display = open ? "unset" : "none"
  const width = String(buttonRight - buttonLeft)

  useEffect(() => {
    const listener = (event: { code: string }) => {
      if (event.code === "Escape") {
        setOpen(false)
      }
    }
    window.addEventListener("keyup", listener)
    return () => {
      window.removeEventListener("keyup", listener)
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
            height: `${availableHeight > 300 ? 300 : availableHeight}px`,
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
      if (setInputValue) {
        setInputValue("")
      }
    },
    [setOpen, onOpenSelector, setInputValue],
  )

  return (
    <>
      <button type="button" ref={reference} onClick={selectorClick}>
        {buttonText}
      </button>
      <div
        ref={floating}
        style={{
          paddingTop: buttonHeight,
          left: buttonLeft,
          position: strategy,
          display: display,
          width: width + "px",
        }}
      >
        <div className="dropdown-menu">
          <ul style={{}}>
            {entityArray.map((entity) => (
              <SelectorRow key={entity.element} entity={entity} onClose={() => setOpen(false)} onSelect={onSelect}/>
            ))}
          </ul>
        </div>
      </div>
      {open && <div className="closeSelector" onClick={() => setOpen(false)}/>}
    </>
  )
})
