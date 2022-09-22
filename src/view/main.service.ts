
import { action } from "mobx";
import { Situation } from "../app/types";
import { firestore, usersCol } from "../firebase";
import { debounce } from "../helper-functions";
import { state } from "./state";
import {doc, setDoc, getDocs, getDoc} from 'firebase/firestore'


export async function initialSetup(){
  await getUsers()
  if(state.debugModeOn){
    console.log('setting user as daniel');
    userSelected('Daniel')
  }
}

export const getUsers = () => {
  return getDocs(usersCol)
  .then(action(snapshots => {
    state.users = snapshots.docs.map(doc => doc.id)
  }))
}

export const createUser = (name: string) => {
  setDoc(doc(firestore, "Users", name), {
    situations: []
  })
  createToast('User Created')
  userSelected(name)
}

export const userSelected = action((name: string) => {
  state.user = name
  loadSavedData()
})

export async function loadSavedData(){
  console.log('loadSavedData :>> ');
  state.situations = (
    (await getDoc(doc(firestore, 'Users', state.user!)))
    .data() as {situations: Situation[]}
  ).situations

  console.log('state.situations :>> ', state.situations);

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



export const specialSave = () => {
  
  setDoc(doc(firestore, "Users", state.user!), {
    situations: situationsx
  })
}


const situationsx = [
  {
    "emotions": [
      "fear",
      "resistance",
      "stress"
    ],
    "negativeThoughts": [
      {
        "strengthRating": "Average",
        "name": "ive just realised how much work i have to do, and i get this feeling of overwhelm, daunted by the work, i realise i will have to dedicate a decent amount of time and effort to accomplish this work, and it makes me feel uncomfortable",
        "counterThoughts": [
          {
            "counterThoughts": [],
            "name": "Upon realising you have more work to do, it triggers a memory circuit from your trauma, of when you had a lot of work to do, and you felt horrible, so you avoided. Your work to improve yourself is to undo and rewrite the trauma programming from when you were a kid. Sitting with your fear is key",
            "strengthRating": "Average"
          },
          {
            "strengthRating": "Average",
            "counterThoughts": [],
            "name": "The resistance you feel is a good thing. If you didn't want to do this task, you wouldn't feel resistance, you would feel happy to stop. This means you truly value what you are doing"
          }
        ]
      }
    ],
    "name": "when i start doing work and i realise how much work there is to do"
  },
  {
    "negativeThoughts": [
      {
        "counterThoughts": [
          {
            "counterThoughts": [],
            "name": "If you go back to the games, you are only reinforcing the old bad habit, when fear of the task blocks even thinking about the task. Break the habit, each time you do it, it will feel easier and less uncomfortable",
            "strengthRating": "Average"
          },
          {
            "name": "Of course you wont feel good about it, you know the start is always the hardest, and you know your problem is trauma of shit work. You know once you start, not only will it not feel as bad as the initial feeling, but it will even become fun and rewarding",
            "counterThoughts": [],
            "strengthRating": "Average"
          }
        ],
        "strengthRating": "Average",
        "name": "I don't feel good about it, something is pushing me away, I don't know what it is, I don't think I can do it now. I'll play a game for a bit instead in order to feel more chill about it and try again later."
      }
    ],
    "emotions": [
      "uncomfortability",
      "anxiety",
      "resistance"
    ],
    "name": "When i go to do work"
  },
  {
    "emotions": [
      "Uncertain",
      "Daunted",
      "Exhaust"
    ],
    "name": "Chasing suppliers about data ",
    "negativeThoughts": [
      {
        "counterThoughts": [
          {
            "counterThoughts": [],
            "name": "Regardless of how long it takes, it still has to be done"
          }
        ],
        "name": "I dont know how long it will take. It could be 2 minutes, it could be 2 weeks",
        "strengthRating": "Standard"
      },
      {
        "name": "I have to do lots of shitty work, but I cant be sure it will lead anywhere, its not worth doing all this if theres not going to be an outcome",
        "strengthRating": "Standard",
        "counterThoughts": []
      },
      {
        "strengthRating": "Genuine Problem",
        "name": "Real life has dead-ends, mistakes and ambiguities, the directions aren't clear",
        "counterThoughts": []
      },
      {
        "name": "Things need to make sense",
        "counterThoughts": [
          {
            "name": "Garity: This sounds very logical and appropriate, but I think with you, it sometimes gets enlisted on the negative side to paralyzes you from action'",
            "counterThoughts": []
          }
        ],
        "strengthRating": "Standard"
      },
      {
        "strengthRating": "Standard",
        "name": "I have to be gritty, resilient and tough",
        "counterThoughts": []
      },
      {
        "strengthRating": "Genuine Problem",
        "counterThoughts": [],
        "name": "I cant act without more certainty"
      },
      {
        "counterThoughts": [],
        "strengthRating": "Stupid Excuse",
        "name": "I just woke up and im a bit groggy so I should do something else"
      },
      {
        "strengthRating": "Standard",
        "name": "I just achieved something, I'll reward myself with stopping work and go to do instant gratification",
        "counterThoughts": [
          {
            "name": "youve built up this momentum, you've overcome the hurdle, you've opened up the passage ahead of you, and now you're gonna stop",
            "counterThoughts": []
          }
        ]
      },
      {
        "counterThoughts": [],
        "strengthRating": "Standard",
        "name": "I'm making bad progress because of my bad psychology. It's a higher priority to do therapy revision, evaluation, notes, work and practice."
      },
      {
        "counterThoughts": [],
        "name": "I'm not feeling strong enough to work, but i dont want to do instant gratification, ill do something inbetween thats something productive that I want to do more than work, like work on my code or clean the house",
        "strengthRating": "Standard"
      },
      {
        "strengthRating": "Standard",
        "counterThoughts": [],
        "name": "One of my responsibilities is to maintian my friendships, when they want to do something I should say yes. I can work anytime, when a social offer comes up, i should take it"
      },
      {
        "strengthRating": "Standard",
        "name": "All this grunt work is the worst, if I could make a system or a program to help make it easier, I should do that to streamline my process and make it less shit",
        "counterThoughts": []
      },
      {
        "counterThoughts": [],
        "name": "When I go to do the work, it associates with negative triggers, the act of struggling to do shitty work triggers my conditioned corelating emotions and thoughts. You cant do what others can, you have a threshold that will stop you from being at the top of anything, ",
        "strengthRating": "Genuine Problem"
      },
      {
        "name": "Your strenghs aren't strenghts, theyre just areas where you're less weak. Compared to others, you don't have strength",
        "counterThoughts": [],
        "strengthRating": "Standard"
      },
      {
        "counterThoughts": [],
        "name": "Other people who are intelligent, conscientious, no cognitive imparement, no emotional scaring, and nurturing support network, have such a massive advantage over me. Especially young people with accelerating momentum, considering im 35, not to mention the insane number of people in the world. The competition is overwhealming. Its hard to find a genuine positive attitude when the evident reality makes everything so pointless and nihilistic",
        "strengthRating": "Genuine Problem"
      },
      {
        "name": "By the time I start to make real progress, ill be too old and all opportunity will be behind me",
        "counterThoughts": [],
        "strengthRating": "Standard"
      },
      {
        "name": "What is my motivation? Nobody cares about what I care about so im not doing it to impress anyone. I wont feel fulfilled if I acomplish my goal",
        "strengthRating": "Stupid Excuse",
        "counterThoughts": []
      },
      {
        "strengthRating": "Genuine Problem",
        "name": "The more I try, the more I'll fail, and then I will further reinfoce the the horrible feeling associated with trying",
        "counterThoughts": []
      },
      {
        "name": "How do I know this is the best option for me, how do I know my focus and efforts wouldn't be better spent elsewhere. The more I try to focus on one thing, the more I make myself blind to other, possibly better, options",
        "counterThoughts": [],
        "strengthRating": "Standard"
      },
      {
        "strengthRating": "Standard",
        "counterThoughts": [],
        "name": "I've lost over $15,000 on stocks, Is this not proof that im not as smart as I think I am. If I compound inflated sense of correctness, with adhd impulse, with my naievety/ignorance,  with a more positive confident, just do it' approach. Then this sounds like a recipie set myself up for more ignorant failure"
      }
    ]
  }
]