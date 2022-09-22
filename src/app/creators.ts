import { Thought } from "./types";

export function createThought(type: 'negative' | 'more helpful'): Thought{
  return {
    name: '', 
    type,
    strengthRating: 'Average',
    counterThoughts: []
  }
}