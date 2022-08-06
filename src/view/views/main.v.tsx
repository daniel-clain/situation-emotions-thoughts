
import { observer } from 'mobx-react';
import * as React from 'react';
import { useEffect } from 'react';
import { SituationsList_C } from '../components/situations-list-component';
import { Toasts_P } from '../components/toasts.partial';
import { loadSavedData, specialSave } from '../main.service';


export const Main_V = observer(() => {

  useEffect(() => {
    loadSavedData()
  }, [])

  return <>
    {/* <button onClick={specialSave}>Do It</button> */}
    <SituationsList_C/>
    <Toasts_P/>
  </>
})
