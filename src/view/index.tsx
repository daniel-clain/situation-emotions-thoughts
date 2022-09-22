
import { render } from 'react-dom'
import * as React from 'react';
import '../firebase'

import './style.sass'
import { Main_V } from './views/main.v';

import { initialSetup } from './main.service';
import { StrictMode } from 'react';
import { state } from './state';
import { UserSelect_C } from './components/user-select';
import { observer } from 'mobx-react';


initialSetup()

const Index = observer(() => {
  
  const {user} = state
  
  return <>
    <StrictMode>    
      {!user ? 
        <UserSelect_C/> : <Main_V/>
      }
    </StrictMode>
  </>
})



render(<Index />, 
  document.body.appendChild(
    document.createElement('situation-emotions-thoughts')
  )
)
