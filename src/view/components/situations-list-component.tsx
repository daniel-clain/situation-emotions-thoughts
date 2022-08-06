import { observer } from 'mobx-react'
import * as React from 'react'
import { useState } from 'react'
import { Situation } from '../../app/types'
import { addSituation, deleteSituation, updateSituation } from '../crud.service'
import { state } from '../state'
import { EmotionsList_C } from './emotions-list.component'
import { UnhelpfulThoughtsList_C } from './unhelpful-thoughts-list.component'


export const SituationsList_C = observer(() => {
  const {situations} = state
  const [openSituation, setOpenSituation] = useState<Situation | undefined>(
    situations.find(s => s.situation == '')
  )
  const [situationFilter, setSituationFilter] = useState<string>()

  return (
    <>  
      <situations-list>
        <row-block>  
          <button 
            className='add-button'
            onClick={addSituation}
          >
            Add Situation
          </button>
          <input
            placeholder='Search'
            className='search-input'
            onChange={({target:{value}}) => setSituationFilter(value)} 
          />
        </row-block>  

        {situations
          .filter(s => !situationFilter ? s : s.situation.includes(situationFilter))
          .map((situation, i) => 

          <situation-block 
            key={i} 
            class={openSituation == situation || situation.situation == ''  ? 'is-open' : ''}
            onClick={() => openSituation != situation && setOpenSituation(situation)}
          >
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
                onClick={() => setOpenSituation(undefined)}
                >
                Collapse Situation
              </button>
            </row-block> 
            <input
              className='data-input'
              value={situation.situation}
              onChange={(e) => updateSituation(e, situation)} 
            />

            <EmotionsList_C {...{situation}}/>

            <UnhelpfulThoughtsList_C {...{situation}} />

          </situation-block>
        )}


      </situations-list>
    </>
  )
})