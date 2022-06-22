import React, {useCallback} from 'react';
import './SelectorWidget.css';
import {Selector} from "./Selector";
import {EntityOption} from "./EntityOption";


export function SelectorWidget() {

  const onSelect = useCallback(() => {
  }, [])

  const entityArray: Array<EntityOption> = []
  for (let i = 0; i < 30; i++) {
    const entity: EntityOption = {element: i, id: i}
    entityArray.push(entity)
  }

  return (
    <div className="SelectorWidget">
      <h1>Selector</h1>
      <Selector onSelect={onSelect} entityArray={entityArray} buttonText={"selector for ts"}/>
    </div>
  );
}

export default SelectorWidget;
