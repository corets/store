import { createStore, Store } from "./index"

describe("createStore", () => {
  it("creates a store with initial state", () => {
    const store = createStore({ foo: "bar" })

    expect(store instanceof Store).toBe(true)
    expect(store.get()).toEqual({ foo: "bar" })
  })
})
