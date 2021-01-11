import { Store } from "./index"

describe("Store", () => {
  it("creates store with initial state", () => {
    const store = new Store({ foo: "bar" })

    expect(store.get()).toEqual({ foo: "bar" })
  })

  it("returns a copy of state", () => {
    const obj = { foo: "bar", baz: { yolo: "swag" } }
    const store = new Store(obj)

    expect(store.get()).toEqual(obj)
    expect(store.get() === obj).toBe(false)
    expect(store.get().baz === obj.baz).toBe(false)
  })

  it("sets state", () => {
    const value = { foo: "bar" }
    const store = new Store(value)

    store.set({ foo: "baz" })

    expect(store.get()).toEqual({ foo: "baz" })
    expect(value).toEqual({ foo: "bar" })
  })

  it("adds state", () => {
    const value = { foo: "bar", yolo: "swag" }
    const store = new Store(value)

    store.add({ yolo: "bar" })

    expect(store.get()).toEqual({ foo: "bar", yolo: "bar" })
    expect(value).toEqual({ foo: "bar", yolo: "swag" })
  })

  it("resets state to initial state", () => {
    const store = new Store<any>({ foo: "bar" })
    store.add({ yolo: "swag" })

    expect(store.get()).toEqual({ foo: "bar", yolo: "swag" })

    store.reset()
    expect(store.get()).toEqual({ foo: "bar" })
  })

  it("resets state to new initial state", () => {
    const store = new Store<any>({ foo: "bar" })

    store.reset()

    expect(store.get()).toEqual({ foo: "bar" })

    store.add({ yolo: "swag" })
    store.reset({ bar: "baz" })

    expect(store.get()).toEqual({ bar: "baz" })

    store.add({ yolo: "swag" })
    store.reset()

    expect(store.get()).toEqual({ bar: "baz" })
  })

  it("does not mutate previous state", () => {
    const store = new Store({ foo: "bar", yolo: "swag" })
    const value1 = store.get()
    const value2 = store.get()

    store.add({ yolo: "bar" })
    expect(value1).toEqual({ foo: "bar", yolo: "swag" })
    expect(value2).toEqual({ foo: "bar", yolo: "swag" })

    store.set({ foo: "bar", yolo: "baz" })
    expect(store.get()).toEqual({ foo: "bar", yolo: "baz" })
    expect(value1).toEqual({ foo: "bar", yolo: "swag" })
    expect(value2).toEqual({ foo: "bar", yolo: "swag" })
  })

  it("listens", () => {
    const store = new Store({ foo: "bar" })
    const callback = jest.fn()

    const removeListener = store.listen(callback)

    expect(callback).toHaveBeenCalledTimes(1)
    expect(callback).toHaveBeenCalledWith({ foo: "bar" })

    store.set({ foo: "baz" })

    expect(callback).toHaveBeenCalledTimes(2)
    expect(callback).toHaveBeenCalledWith({ foo: "baz" })

    store.reset()

    expect(callback).toHaveBeenCalledTimes(3)
    expect(callback).toHaveBeenCalledWith({ foo: "bar" })

    removeListener()

    store.set({ yolo: "swag" } as any)

    expect(callback).toHaveBeenCalledTimes(3)
  })
})
