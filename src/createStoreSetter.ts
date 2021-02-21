import { CreateStoreSetter, ObservableStore, StoreSetter } from "./types"

export const createStoreSetter: CreateStoreSetter = <TValue extends object>(store: ObservableStore<TValue>) => {
  const setter: StoreSetter<TValue> = (newValue) => {
    if (newValue instanceof Function) {
      store.set(newValue(store.get()))
    } else {
      store.set(newValue)
    }
  }

  return setter
}
