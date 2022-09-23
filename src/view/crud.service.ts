import { action } from "mobx"
import { ChangeEvent, FormEvent } from "react"
import { createThought } from "../app/creators"
import { Situation, Thought, StrengthRating, NegativeThought, ThoughtType_L } from "../app/types"
import { deleteByProperty } from "../helper-functions"
import { createToast, debounceSave, saveData } from "./main.service"
import { state } from "./state"

export const addSituation = action(() => {  
  if(state.situations.find(s => s.name == '')) return
  state.situations.unshift({
    name:'',
    emotions: [],
    negativeThoughts: []
  })
  console.log('situations add');
})


export const updateSituation = action(
  (name: string, situation: Situation) => {
    situation.name = name
    debounceSave('Situation')
  }
)


export const deleteSituation = action((situation: Situation) => {
  const confirmed = confirm('Are you sure you want to delete situation?')
  if(confirmed){
    deleteByProperty({
      array: state.situations, 
      prop: 'name', 
      val: situation.name
    })
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



export const updateStrengthRating = action((
  {target}: ChangeEvent<HTMLSelectElement>,
  thought: Thought
) => {
  thought.strengthRating = target.value as StrengthRating
  saveData()
  .then(() => createToast('Challenge Rating Updated'))
})

export const updateType = action((
  {target}: ChangeEvent<HTMLSelectElement>,
  thought: Thought
) => {
  thought.type = target.value as ThoughtType_L
  saveData()
  .then(() => createToast('Type Updated'))
})

export const addThought = action((parent: Thought | Situation) => {
  
  console.log('addThought :>> ', parent);
  if('negativeThoughts' in parent){
    const situation = parent as Situation
    if(situation.negativeThoughts.some(t => t.name == '')) return
    situation.negativeThoughts.unshift(createThought('negative'))    
  } else {
    const thought = parent as Thought
    if(thought.counterThoughts.some(t => t.name == '')) return
    thought.counterThoughts.unshift(createThought("more helpful"))

  }

})



export const updateThought = action((
  {target}: ChangeEvent<HTMLTextAreaElement>,
  thought: Thought
) => {
  thought.name = target.value  
  debounceSave('Helpful Thought')
})


export const deleteThought = action((
  thought: Thought,
  parent: Thought | Situation
) => {
  const confirmed = confirm('Are you sure you want to delete?')
  if(confirmed){
    if('counterThoughts' in parent){
      const parentThought = parent as Thought
      deleteByProperty({
        array: parentThought.counterThoughts, 
        prop: 'name', 
        val: thought.name
      })
    } else {
      const situation = parent as Situation
      deleteByProperty({
        array: situation.negativeThoughts, 
        prop: 'name', 
        val: thought.name
      })

    }
    saveData()
    .then(() => createToast('Thought Deleted'))
  }

})

