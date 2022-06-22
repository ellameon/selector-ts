import { useCallback } from "react"
import {EntityOption} from "./EntityOption";


type Props = {
  entity: EntityOption
  onClose: () => void
  onSelect: (id: number) => void
}

export const SelectorRow = (function SelectorRow(props: Props) {
  const { entity, onClose, onSelect } = props
  const name = entity.element
  const id = entity.id

  const onClick = useCallback(() => {
    onSelect(id)
    onClose()
  }, [id, onSelect, onClose])

  return (
    <div>
      <a onClick={onClick}>
        <label className="cursor-pointer">{name}</label>
      </a>
    </div>
  )
})
