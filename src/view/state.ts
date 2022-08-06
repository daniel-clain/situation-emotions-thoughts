
import { observable } from "mobx";
import { Situation } from "../app/types";

export type MainState = {
  situations: Situation[]
  toasts: string[]
  users: string[]
  user: string | undefined
}

export const state: MainState = observable({situations: [], toasts: [], users: [], user: undefined})
