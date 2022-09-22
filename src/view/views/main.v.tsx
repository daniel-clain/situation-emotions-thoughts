
import { observer } from 'mobx-react';
import * as React from 'react';
import { SituationsList_C } from '../components/situations-list';
import { Toasts_P } from '../components/toasts.partial';
import { specialSave } from '../main.service';
import { state } from '../state';


export const Main_V = observer(() => {
  return <>
    {state.debugModeOn ?
      <button onClick={specialSave}>Do It</button>
      : <></>
    }
    <SituationsList_C/>
    <Toasts_P/>
  </>
})
