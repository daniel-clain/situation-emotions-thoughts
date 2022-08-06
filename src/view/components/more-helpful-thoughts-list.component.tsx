import { observer } from 'mobx-react';
import * as React from 'react';
import { Thought } from '../../app/types';
import { addHelpfulThought, updateHelpfulThought, deleteHelpfulThought } from '../crud.service';
export const MoreHelpfulThoughtsList_C = observer((({thought}: {thought: Thought}) => {
  return (
    <more-helpful-thoughts-list>
      <h2>More helpful Thoughts</h2>
      <button 
        className='add-button' 
        onClick={() => addHelpfulThought(thought)}
      >
        Add Helpful Thought
      </button>
      {thought.helpfulThoughts.map((helpfulThought, i) => 
        <more-helpful-thought key={i}>
          <textarea
            className='data-input'
            value={helpfulThought}
            onChange={(e) => updateHelpfulThought(e, thought, helpfulThought)} 
          />
          <button 
            className='delete-button' 
            onClick={() => deleteHelpfulThought(thought, helpfulThought)}
          >
            Delete Thought
          </button>
        </more-helpful-thought>
      )}
    </more-helpful-thoughts-list>
  )
}))