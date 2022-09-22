export type StrengthRating = 'Weak' | 'Average' | 'Strong'
export const strengthRatings: StrengthRating[] = ['Weak', 'Average', 'Strong']


export type Situation = {
  name: string
  emotions: string[] // what emotion words describe the feelings
  negativeThoughts: Thought[]
}

export type User = {
  name
}

export type ThoughtType_L = 'negative' | 'more helpful'

export type Thought = {
  name: string
  type: ThoughtType_L
  counterThoughts: Thought[]
  strengthRating: StrengthRating
}


export type NegativeThought = Thought & {
  counterThoughts: MoreHelpfulThought[]
  type: 'negative'
}
export type MoreHelpfulThought = Thought & {
  counterThoughts: NegativeThought[]
  type: 'more helpful'
}