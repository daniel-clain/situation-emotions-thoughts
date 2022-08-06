import { action } from "mobx"
import { ChangeEvent } from "react"
import { Situation, Thought, ChallengeRating } from "../app/types"
import { createToast, debounceSave, saveData } from "./main.service"
import { state } from "./state"

export const addSituation = action(() => {  
  if(state.situations.find(s => s.situation == '')) return
  state.situations = [{
    situation:'',
    emotions: [],
    thoughts: []
  }, ...state.situations]
  console.log('situations add');
})


export const updateSituation = action(
  ({target}: ChangeEvent<HTMLInputElement>, situation: Situation) => {
    situation.situation = target.value
    debounceSave('Situation')
  }
)


export const deleteSituation = action((situation: Situation) => {
  const confirmed = confirm('Are you sure you want to delete situation?')
  if(confirmed){
    state.situations = state.situations.filter(s => s != situation)
    saveData()
    .then(() => createToast('Situation Deleted'))
  }
})


export const addEmotion = action((situation: Situation) => {
  if(situation.emotions.find(e => e == '')) return
  situation.emotions.unshift('')
})


export const updateEmotion = action((
  {target}: ChangeEvent<HTMLInputElement>, 
  situation: Situation,
  emotion: string
) => {
    
  situation.emotions = situation.emotions.map(e => 
    e == emotion ? target.value : e  
  )
  
  debounceSave('Emotion')
})


export const deleteEmotion = action((situation: Situation, emotion: string) => {

  situation.emotions = situation.emotions.filter(e => e != emotion)
  saveData()
  .then(() => createToast('Emotion Deleted'))
})



export const addUnhelpfulThought = action((situation: Situation) => {
  if(situation.thoughts.find(t => t.unhelpfulThought == '')) return
  situation.thoughts.unshift({
    unhelpfulThought: '',
    challengeRating: 'Standard',
    helpfulThoughts: ['']
  })

})


export const updateUnhelpfulThought = action((
  {target}: ChangeEvent<HTMLTextAreaElement>, 
  thought: Thought
) => {
  thought.unhelpfulThought = target.value
  debounceSave('Unhelpful Thought')
})


export const deleteUnhelpfulThought = action((
  situation: Situation, 
  thought: Thought
) => {
  const confirmed = confirm('Are you sure you want to delete though?')
  if(confirmed){
    situation.thoughts = situation.thoughts.filter(t => t != thought)
    saveData()
    .then(() => createToast('Unhelpful Thought Deleted'))
  }

})


export const updateChallengeRating = action((
  {target}: ChangeEvent<HTMLSelectElement>,
  thought: Thought
) => {
  thought.challengeRating = target.value as ChallengeRating
  saveData()
  .then(() => createToast('Challenge Rating Updated'))
})



export const addHelpfulThought = action((thought: Thought) => {
  console.log('thought.helpfulTHoughts :>> ', thought.helpfulThoughts);
  if(thought.helpfulThoughts.some(ht => ht == '')) return
  thought.helpfulThoughts.unshift('')
})



export const updateHelpfulThought = action((
  {target}: ChangeEvent<HTMLTextAreaElement>,
  thought: Thought,
  helpfulThought: string
) => {

  thought.helpfulThoughts = thought.helpfulThoughts.map(ht => 
    ht == helpfulThought ? target.value : ht
  )    
  debounceSave('Helpful Thought')
})


export const deleteHelpfulThought = action((thought: Thought,  helpfulThought: string) => {
  const confirmed = confirm('Are you sure you want to delete?')
  if(confirmed){
    thought.helpfulThoughts = thought.helpfulThoughts.filter(t => t != helpfulThought)
    saveData()
    .then(() => createToast('Helpful Thought Deleted'))
  }

})

