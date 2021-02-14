import { Store } from "./index"

describe("Store", () => {
  it("creates store with initial value", () => {
    const store = new Store({ foo: "bar" })

    expect(store.get()).toEqual({ foo: "bar" })
  })

  it("returns a copy of value", () => {
    const obj = { foo: "bar", baz: { yolo: "swag" } }
    const store = new Store(obj)

    expect(store.get()).toEqual(obj)
    expect(store.get() === obj).toBe(false)
    expect(store.get().baz === obj.baz).toBe(false)
  })

  it("sets value", () => {
    const value = { foo: "bar" }
    const store = new Store(value)

    store.set({ foo: "baz" })

    expect(store.get()).toEqual({ foo: "baz" })
    expect(value).toEqual({ foo: "bar" })
  })

  it("puts value", () => {
    const value = { foo: "bar", yolo: "swag" }
    const store = new Store(value)

    store.put({ yolo: "bar" })

    expect(store.get()).toEqual({ foo: "bar", yolo: "bar" })
    expect(value).toEqual({ foo: "bar", yolo: "swag" })
  })

  it("does not mutate previous value", () => {
    const store = new Store({ foo: "bar", yolo: "swag" })
    const value1 = store.get()
    const value2 = store.get()

    store.put({ yolo: "bar" })
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

    expect(callback).toHaveBeenCalledTimes(0)

    store.set({ foo: "baz" })

    expect(callback).toHaveBeenCalledTimes(1)
    expect(callback).toHaveBeenCalledWith({ foo: "baz" })

    store.set({ foo: "baz" })

    expect(callback).toHaveBeenCalledTimes(1)

    store.set({ foo: "bar" })

    expect(callback).toHaveBeenCalledTimes(2)
    expect(callback).toHaveBeenCalledWith({ foo: "bar" })

    removeListener()

    store.set({ yolo: "swag" } as any)

    expect(callback).toHaveBeenCalledTimes(2)
  })

  it("listens with immediate", () => {
    const store = new Store({ foo: "bar" })
    const callback = jest.fn()

    const removeListener = store.listen(callback, { immediate: true })

    expect(callback).toHaveBeenCalledTimes(1)
    expect(callback).toHaveBeenCalledWith({ foo: "bar" })

    store.set({ foo: "baz" })

    expect(callback).toHaveBeenCalledTimes(2)
    expect(callback).toHaveBeenCalledWith({ foo: "baz" })

    store.set({ foo: "baz" })

    expect(callback).toHaveBeenCalledTimes(2)

    store.set({ foo: "bar" })

    expect(callback).toHaveBeenCalledTimes(3)
    expect(callback).toHaveBeenCalledWith({ foo: "bar" })

    removeListener()

    store.set({ yolo: "swag" } as any)

    expect(callback).toHaveBeenCalledTimes(3)
  })

  it("listen with a custom differ", () => {
    const store = new Store({ foo: "bar" })
    const callback = jest.fn()

    const removeListener = store.listen(callback, {
      immediate: true,
      differ: () => true,
    })

    expect(callback).toHaveBeenCalledTimes(1)
    expect(callback).toHaveBeenCalledWith({ foo: "bar" })

    store.set({ foo: "baz" })

    expect(callback).toHaveBeenCalledTimes(2)
    expect(callback).toHaveBeenCalledWith({ foo: "baz" })

    store.set({ foo: "baz" })

    expect(callback).toHaveBeenCalledTimes(3)
    expect(callback).toHaveBeenCalledWith({ foo: "baz" })

    store.set({ foo: "bar" })

    expect(callback).toHaveBeenCalledTimes(4)
    expect(callback).toHaveBeenCalledWith({ foo: "bar" })

    removeListener()

    store.set({ yolo: "swag" } as any)

    expect(callback).toHaveBeenCalledTimes(4)
  })

  it("diffs", () => {
    const store = new Store({ foo: "bar" })
    const callback = jest.fn()

    store.listen(callback, { immediate: true })

    expect(callback).toHaveBeenCalledTimes(1)
    expect(callback).toHaveBeenCalledWith({ foo: "bar" })

    store.set({ foo: "bar" })

    expect(callback).toHaveBeenCalledTimes(1)

    store.set({ foo: "baz" })

    expect(callback).toHaveBeenCalledTimes(2)
    expect(callback).toHaveBeenCalledWith({ foo: "baz" })
  })

  it("diffs with a custom differ", () => {
    const store = new Store({ foo: "bar" }, { differ: () => true })
    const callback = jest.fn()

    store.listen(callback, { immediate: true })

    expect(callback).toHaveBeenCalledTimes(1)
    expect(callback).toHaveBeenCalledWith({ foo: "bar" })

    store.set({ foo: "bar" })

    expect(callback).toHaveBeenCalledTimes(2)
    expect(callback).toHaveBeenCalledWith({ foo: "bar" })

    store.set({ foo: "baz" })

    expect(callback).toHaveBeenCalledTimes(3)
    expect(callback).toHaveBeenCalledWith({ foo: "baz" })
  })
})
