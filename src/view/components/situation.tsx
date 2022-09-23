
import * as React from 'react';
import { Situation } from "../../app/types"
import { EmotionsList_C } from './emotions-list';
import { deleteSituation, updateSituation } from '../crud.service';
import { ThoughtsList_P } from './thoughts-list';
import { EditableText_C } from './editable-text';

export const Situation_P = ((
  {situation, onCloseClicked}: 
  {
    situation: Situation, 
    onCloseClicked: () => void
  }) => {
  return (
    <>
      <row-block>   
        <h2>Situation</h2>
        <button 
          className='delete-button'
          onClick={() => deleteSituation(situation)}
          >
          Delete Situation
        </button>
        <button 
          className='collapse-button'
          onClick={onCloseClicked}
          >
          Collapse Situation
        </button>
      </row-block>  
      
      <EditableText_C
        text={situation.name}
        onChange={(updatedText) => updateSituation(updatedText, situation)} 
      />


      <EmotionsList_C {...{situation}}/>
      <ThoughtsList_P parent={situation} />
    </>
  )
})