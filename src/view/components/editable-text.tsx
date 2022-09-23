
import { observer } from 'mobx-react'
import * as React from 'react'

export const EditableText_C = observer((
  {text, onChange}:
  {
    text: string,
    onChange(updatedValue: string)
  }
) => 
  <editable-text  
    class='data-input'
    onInput={({target}) => {
      const {textContent} = (target as HTMLElement)
      if(typeof textContent === 'string'){
        onChange(textContent)
      }
    }}
    onBlur={({target: {textContent}}) => {
      if(typeof textContent === 'string'){
        onChange(textContent)
      }
    }}
    role={'textbox'}
    contentEditable
    dangerouslySetInnerHTML={{__html: text}}
  />
)