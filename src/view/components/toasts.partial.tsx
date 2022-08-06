
import { observer } from 'mobx-react';
import * as React from 'react';
import {useEffect} from 'react';

import { state } from '../state';



export const Toasts_P = observer(() => {
  const {toasts} = state
  return <>
    <toasts-list>
      {toasts.map((toast, i) => 
        <toast-item key={i}>{toast}</toast-item>
      )}
    </toasts-list>
  </>
})