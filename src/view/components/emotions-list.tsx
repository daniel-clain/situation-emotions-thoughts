import { observer } from 'mobx-react';
import * as React from 'react';
import { Situation } from '../../app/types';
import { addEmotion, updateEmotion, deleteEmotion } from '../crud.service';
export const EmotionsList_C = observer((({situation}: {situation: Situation}) => {
  return (
    <emotions-list>
      <h2>Emotions</h2>
      <button
        className='add-button' 
        onClick={() => addEmotion(situation)}
      >
        Add Emotion
      </button>
      {situation.emotions.map((emotion, i) => 
        <emotion-item key={i}>
          <input
            className='data-input'
            value={emotion}
            onChange={(e) => updateEmotion(e, situation, emotion)} 
          />
          <button 
            className='delete-button' 
            onClick={() => deleteEmotion(situation, emotion)}
          >
            Delete Emotion
          </button>
        </emotion-item>
      )}
    </emotions-list>
  )
}))