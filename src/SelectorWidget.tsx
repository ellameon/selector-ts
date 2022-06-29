import React, {useCallback} from 'react';
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

  const getNewChunk = useCallback(async (offset: number, limit: number): Promise<Array<EntityOption>> => {
    const beginValue = (offset === 0) ? 0 : (offset * limit - limit)
    return entities.slice(beginValue, (offset * limit + limit))
  }, [])

  return (
    <div className="SelectorWidget">
      <h1>Selector</h1>
      <Selector onSelect={onSelect} buttonText={"selector for ts"} limit={30} getNewChunk={getNewChunk}
      />
      <h1>Selector</h1>
      <Selector onSelect={onSelect} buttonText={"selector for ts"} limit={30} getNewChunk={getNewChunk}
      />
    </div>
  );
}

export default SelectorWidget;
