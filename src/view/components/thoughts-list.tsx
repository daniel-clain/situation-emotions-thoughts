
import { observer } from 'mobx-react';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Situation, Thought } from '../../app/types';
import { addThought } from '../crud.service';
import { Thought_P } from './thought';


type Props = {
  parent: Situation | Thought
}

export const ThoughtsList_P = observer((
  {parent}: Props
) => {
  const parentIsSituation = 'negativeThoughts' in parent

  const thoughts = (parentIsSituation ?
    parent.negativeThoughts : 
    parent.counterThoughts
  ) as Thought[]

  const listThoughtType = 
    parentIsSituation ? 'negative' 
      : (parent as Thought).type == 'negative' ? 
      'more helpful' : 'negative'
  
  const [openThought, setOpenThought] = useState<Thought | undefined>(
    
  )

  useEffect(() => {
    const blankThought = thoughts.find(t => t.name == '')
    if(blankThought) {
      console.log('zonk');
      setOpenThought(blankThought)
    }
  })

  const [thoughtFilter, setThoughtFilter] = useState<string>()
  

  const nameHasFilterText = (t:Thought) => !thoughtFilter ? t : t.name.includes(thoughtFilter)

  return (
    <thoughts-list 
      class={listThoughtType == 'negative' ? 
        'negative' : 'positive'
      }
    >


      <row-block>  
        <button 
          className='add-button' 
          onClick={() => addThought(parent)}
        >
          Add {listThoughtType} Thought
        </button>
        {thoughts.length ?
          <input
            placeholder='Search'
            className='search-input'
            onChange={({target:{value}}) => setThoughtFilter(value)} 
          />
          : <></>
        }
      </row-block>

      {thoughts.length ?
        <h2>{listThoughtType} Thoughts</h2>
        : <></>
      }

      {thoughts
        .filter(nameHasFilterText)
        .map((thought, i) => 
          <thought-item
            key={i}
            class={openThought == thought ? 'is-open' : ''}
            onClick={() => 
              openThought != thought && 
              setOpenThought(thought)
            }     
          >
            <Thought_P 
              thought={thought}
              parent={parent}
              onCollapseClicked={() => setOpenThought(undefined)}
            />
            
            <ThoughtsList_P parent={thought} />
            
          </thought-item>
        )
      }
    </thoughts-list>
  )
})