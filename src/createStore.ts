import { CreateStore } from "./types"
import { Store } from "./Store"

export const createStore: CreateStore = (initialValue) =>
  new Store(initialValue)
