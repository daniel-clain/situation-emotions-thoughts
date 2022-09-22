
import { observable, toJS } from "mobx";
import { Situation } from "../app/types";

export type MainState = {
  debugModeOn?: boolean
  situations: Situation[]
  toasts: string[]
  users: string[]
  user: string | undefined
}

export const state: MainState = observable({situations: [], toasts: [], users: [], user: undefined, debugModeOn: false})

;(window as any).getState = () => toJS(state)

