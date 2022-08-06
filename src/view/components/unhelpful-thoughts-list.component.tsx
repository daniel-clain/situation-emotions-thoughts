import { observer } from 'mobx-react';
import * as React from 'react';
import { useState } from 'react';
import { challengeRatings, Situation, Thought } from '../../app/types';
import { addUnhelpfulThought, updateUnhelpfulThought, updateChallengeRating, deleteUnhelpfulThought } from '../crud.service';
import { MoreHelpfulThoughtsList_C } from './more-helpful-thoughts-list.component';
export const UnhelpfulThoughtsList_C = observer((({situation}: {situation: Situation}) => {

  const [openThought, setOpenThought] = useState<Thought>()
  const [thoughtFilter, setThoughtFilter] = useState<string>()
  return (
    <unhelpful-thoughts-list>

      <h2>Unhelpful Thoughts</h2>

      <row-block>  
        <button 
          className='add-button' 
          onClick={() => addUnhelpfulThought(situation)}
        >
          Add Unhelpful Thought
        </button>

        <input
          placeholder='Search'
          className='search-input'
          onChange={({target:{value}}) => setThoughtFilter(value)} 
        />
      </row-block>  

      {situation.thoughts
        .filter(t => !thoughtFilter ? t : t.unhelpfulThought.includes(thoughtFilter))
        .map((thought, i) => 

        <unhelpful-thought-block 
          key={i}
          class={openThought == thought || thought.unhelpfulThought == '' ? 'is-open' : ''}
          onClick={() => openThought != thought && setOpenThought(thought)}
        >
          <row-block>
            <h2>Unhelpful Thought</h2> 
            <button 
              className='delete-button' 
              onClick={() => deleteUnhelpfulThought(situation, thought)}
              >
              Delete Thought
            </button>
            <button 
              className='collapse-button'
              onClick={() => setOpenThought(undefined)}
              >
              Collapse Thought
            </button>
          </row-block>

          <textarea
            className='data-input'
            value={thought.unhelpfulThought}
            onChange={(e) => updateUnhelpfulThought(e, thought)} 
          />
          <challenge-rating>
            <select
              value={thought.challengeRating}
              onChange={(e) => updateChallengeRating(e, thought)} 
            >
              {challengeRatings.map(challengeRating => 
                <option
                  key={challengeRating}
                  value={challengeRating}
                >{challengeRating}</option>
              )}
            </select>
          </challenge-rating>


          <MoreHelpfulThoughtsList_C {...{thought}}/>
          
        </unhelpful-thought-block>


      )}
    </unhelpful-thoughts-list>
  )
}))