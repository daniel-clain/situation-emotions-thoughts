
import { observer } from 'mobx-react';
import * as React from 'react';
import { Situation, strengthRatings, Thought } from "../../app/types"
import { deleteThought, updateThought, updateStrengthRating, updateType } from '../crud.service';
import { state } from '../state';

export const Thought_P = observer((
  {thought, parent, onCollapseClicked}: 
  {
    thought: Thought, 
    parent: Thought | Situation
    onCollapseClicked: () => void
}) => {
  return (
    <>
      <row-block>
        <h2>{thought.type} Thought</h2>  
        <button 
          className='delete-button' 
          onClick={() => deleteThought(thought, parent)}
          >
          Delete Thought
        </button>
        <button 
          className='collapse-button'
          onClick={onCollapseClicked}
          >
          Collapse Thought
        </button>
      </row-block>

      <textarea
        className='data-input'
        value={thought.name}
        onChange={(e) => updateThought(e, thought)} 
      />
      <strength-rating>
        <select
          value={thought.strengthRating}
          onChange={(e) => updateStrengthRating(e, thought)} 
        >
          {strengthRatings.map(strengthRating => 
            <option
              key={strengthRating}
              value={strengthRating}
            >{strengthRating}</option>
          )}
        </select>
      </strength-rating>

      {state.debugModeOn ?
        <type-rating>
          <select
            value={thought.type}
            onChange={(e) => updateType(e, thought)} 
          >
            <option>Unset</option>
            <option value={'negative'}>Negative</option>
            <option value={'more helpful'}>More Helpful</option>
          </select>
        </type-rating>
        : <></>
      }

    </>
  )
})