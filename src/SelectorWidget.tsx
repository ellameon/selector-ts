import React, {useCallback, useState} from 'react';
import './SelectorWidget.css';
import {Selector} from "./Selector";
import {EntityOption} from "./EntityOption";


export function SelectorWidget() {

  const onSelect = useCallback(() => {
  }, [])

  const entities: Array<EntityOption> = []
  for (let i = 0; i < 10000; i++) {
    const entity: EntityOption = {element: i, id: i}
    entities.push(entity)
  }

  let entityArray: Array<EntityOption> = []
  const limit = 30
  const [offset, setOffset] = useState(0)
  const beginValue = (offset === 0) ? 0 : (offset * limit - limit)
  const fillEntityArray = async (offset: number): Promise<void> => {
    entityArray = entityArray.concat(entities.slice(beginValue, (offset * limit + limit)))
  }

  (async () => {
    await fillEntityArray(offset)
  })()


  return (
    <div className="SelectorWidget">
      <h1>Selector</h1>
      <Selector onSelect={onSelect} entityArray={entityArray} buttonText={"selector for ts"}
                setOffset={setOffset}/>
    </div>
  );
}

export default SelectorWidget;
