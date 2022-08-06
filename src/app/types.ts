export type ChallengeRating = 'Stupid Excuse' | 'Standard' | 'Genuine Problem'
export const challengeRatings: ChallengeRating[] = ['Stupid Excuse', 'Standard', 'Genuine Problem']

export type Thought = {
  unhelpfulThought: string
  challengeRating: ChallengeRating
  helpfulThoughts: string[]
}

export type Situation = {
  situation: string
  emotions: string[] // what emotion words describe the feelings
  thoughts: Thought[]
}

export type User = {
  name
}