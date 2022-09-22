import { observer } from 'mobx-react'
import * as React from 'react'
import { useState } from 'react'
import { Situation } from '../../app/types'
import { addSituation } from '../crud.service'
import { Situation_P } from './situation'
import { state } from '../state'


export const SituationsList_C = observer(() => {
  const {situations} = state
  if(!situations) return <></>
  const [openSituation, setOpenSituation] = useState<Situation | undefined>(
    situations.find(s => s.name == '')
  )
  const [situationFilter, setSituationFilter] = useState<string>()

  const isSituationOpen = (situation: Situation) => situation == openSituation || situation.name == ''

  return (
    <>  
      <situations-list>

        <row-block>  
          <button 
            className='add-button'
            onClick={() => (
              addSituation(), setOpenSituation(undefined)
            )}
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
          .filter(s => !situationFilter ? s : s.name.includes(situationFilter))
          .map((situation, i) => 

            <situation-block 
              key={i} 
              class={isSituationOpen(situation) ? 'is-open' : ''}
              onClick={() => openSituation != situation && setOpenSituation(situation)}
            >
              <Situation_P 
                {...{situation}}
                onCloseClicked={() => setOpenSituation(undefined)}
              />

            </situation-block>
        )}


      </situations-list>
    </>
  )
})
