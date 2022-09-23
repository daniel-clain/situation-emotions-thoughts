import { observer } from 'mobx-react'
import * as React from 'react'
import { useState } from 'react'
import { createUser, userSelected } from '../main.service'
import { state } from '../state'

export const UserSelect_C = observer(() => {
    const {users} = state
    const [name, setName] = useState('')

  return (
    <user-select>
      <select onChange={(
        ({target: {value}}) => userSelected(value)
      )}>
        <option>Select User</option>
        {users.map(user => 
          <option key={user} value={user}>{user}</option>
        )}
      </select>
      <div className='flex-row'>
        <label>Name:</label>
        <input onChange={({target: {value}}) => setName(value)} value={name}/>
        <button onClick={() => {
          if(name != ''){
            createUser(name)
            setName('')
          }
        }}>Create User</button>
      </div>
    </user-select>
  )
})