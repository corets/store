import { CreateStore } from "./types"
import { Store } from "./Store"

export const createStore: CreateStore = (initialValue, config?) =>
  new Store(initialValue, config)
