import {useCallback} from "react"
import {EntityOption} from "./EntityOption";


type Props<T> = {
  entity: EntityOption<T>
  onClose: () => void
  onSelect: (id: number) => void
  valueToString: (value: T) => string
}

export const SelectorRow = (function SelectorRow<T>(props: Props<T>) {
  const {entity, onClose, onSelect, valueToString} = props
  const name = entity.element
  const id = entity.id

  const onClick = useCallback(() => {
    onSelect(id)
    onClose()
  }, [id, onSelect, onClose])

  return (
    <div>
      <a onClick={onClick}>
        <label className="cursor-pointer">
          {valueToString(name)}
        </label>
      </a>
    </div>
  )
})
