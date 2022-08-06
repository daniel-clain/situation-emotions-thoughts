
import { action } from "mobx";
import { Situation } from "../app/types";
import { firestore, usersCol } from "../firebase";
import { debounce } from "../helper-functions";
import { state } from "./state";
import {doc, setDoc, getDocs, getDoc} from 'firebase/firestore'
import { ChangeEvent } from "react";


export function initialSetup(){
  getUsers()
}


export async function loadSavedData(){
  state.situations = (
    (await getDoc(doc(firestore, 'Users', state.user!)))
    .data() as {situations: Situation[]}
  ).situations

}


export async function saveData(): Promise<any>{
  console.log('saving...')
  setDoc(doc(firestore, 'Users', state.user!), {situations: state.situations})
}

export const debounceSave = (type) => {
  debounce(type)
  .then(saveData)
  .then(() => createToast(`${type} Updated`))
  .catch(() => null)
}


export const createToast = action((toast: string) => {
  state.toasts.push(toast)
  setTimeout(action(() => {
    state.toasts.shift()
  }), 3000)
})

export const createUser = (name: string) => {
  setDoc(doc(firestore, "Users", name), {
    situations: []
  })
}
export const getUsers = () => {
  getDocs(usersCol)
  .then(action(snapshots => {
    state.users = snapshots.docs.map(doc => doc.id)
  }))
}

export const userSelected = action(({target: {value}}: ChangeEvent<HTMLSelectElement>) => {
  state.user = value
})


export const specialSave = () => {
  
  setDoc(doc(firestore, "Users", state.user!), {
    situations: situationsx
  })
}


const situationsx = [{"situation":"Chasing suppliers about data ","emotions":["Uncertain","Daunted","Exhaust"],"thoughts":[{"unhelpfulThought":"I dont know how long it will take. It could be 2 minutes, it could be 2 weeks","challengeRating":"Standard","helpfulThoughts":["Regardless of how long it takes, it still has to be done"]},{"unhelpfulThought":"I have to do lots of shitty work, but I cant be sure it will lead anywhere, its not worth doing all this if theres not going to be an outcome","challengeRating":"Standard","helpfulThoughts":[]},{"unhelpfulThought":"Real life has dead-ends, mistakes and ambiguities, the directions aren't clear","challengeRating":"Genuine Problem","helpfulThoughts":[""]},{"unhelpfulThought":"Things need to make sense","challengeRating":"Standard","helpfulThoughts":["Garity: This sounds very logical and appropriate, but I think with you, it sometimes gets enlisted on the unhelpful side to paralyzes you from action'"]},{"unhelpfulThought":"I have to be gritty, resilient and tough","challengeRating":"Standard","helpfulThoughts":[""]},{"unhelpfulThought":"I cant act without more certainty","challengeRating":"Genuine Problem","helpfulThoughts":[""]},{"unhelpfulThought":"I just woke up and im a bit groggy so I should do something else","challengeRating":"Stupid Excuse","helpfulThoughts":[]},{"unhelpfulThought":"I just achieved something, I'll reward myself with stopping work and go to do instant gratification","challengeRating":"Standard","helpfulThoughts":["youve built up this momentum, you've overcome the hurdle, you've opened up the passage ahead of you, and now you're gonna stop"]},{"unhelpfulThought":"I'm making bad progress because of my bad psychology. It's a higher priority to do therapy revision, evaluation, notes, work and practice.","challengeRating":"Standard","helpfulThoughts":[""]},{"unhelpfulThought":"I'm not feeling strong enough to work, but i dont want to do instant gratification, ill do something inbetween thats something productive that I want to do more than work, like work on my code or clean the house","challengeRating":"Standard","helpfulThoughts":[""]},{"unhelpfulThought":"One of my responsibilities is to maintian my friendships, when they want to do something I should say yes. I can work anytime, when a social offer comes up, i should take it","challengeRating":"Standard","helpfulThoughts":[""]},{"unhelpfulThought":"All this grunt work is the worst, if I could make a system or a program to help make it easier, I should do that to streamline my process and make it less shit","challengeRating":"Standard","helpfulThoughts":[""]},{"unhelpfulThought":"When I go to do the work, it associates with negative triggers, the act of struggling to do shitty work triggers my conditioned corelating emotions and thoughts. You cant do what others can, you have a threshold that will stop you from being at the top of anything, ","challengeRating":"Genuine Problem","helpfulThoughts":[""]},{"unhelpfulThought":"Your strenghs aren't strenghts, theyre just areas where you're less weak. Compared to others, you don't have strength","challengeRating":"Standard","helpfulThoughts":[]},{"unhelpfulThought":"Other people who are intelligent, conscientious, no cognitive imparement, no emotional scaring, and nurturing support network, have such a massive advantage over me. Especially young people with accelerating momentum, considering im 35, not to mention the insane number of people in the world. The competition is overwhealming. Its hard to find a genuine positive attitude when the evident reality makes everything so pointless and nihilistic","challengeRating":"Genuine Problem","helpfulThoughts":[""]},{"unhelpfulThought":"By the time I start to make real progress, ill be too old and all opportunity will be behind me","challengeRating":"Standard","helpfulThoughts":[""]},{"unhelpfulThought":"What is my motivation? Nobody cares about what I care about so im not doing it to impress anyone. I wont feel fulfilled if I acomplish my goal","challengeRating":"Stupid Excuse","helpfulThoughts":[""]},{"unhelpfulThought":"The more I try, the more I'll fail, and then I will further reinfoce the the horrible feeling associated with trying","challengeRating":"Genuine Problem","helpfulThoughts":[""]},{"unhelpfulThought":"How do I know this is the best option for me, how do I know my focus and efforts wouldn't be better spent elsewhere. The more I try to focus on one thing, the more I make myself blind to other, possibly better, options","challengeRating":"Standard","helpfulThoughts":[""]},{"unhelpfulThought":"I've lost over $15,000 on stocks, Is this not proof that im not as smart as I think I am. If I compound inflated sense of correctness, with adhd impulse, with my naievety/ignorance,  with a more positive confident, just do it' approach. Then this sounds like a recipie set myself up for more ignorant failure","challengeRating":"Standard","helpfulThoughts":[""]}]}]