import { defaultMerger } from "./defaultMerger"

describe("defaultMerger", () => {
  it("merges value", () => {
    const obj = { foo: "bar" }

    expect(defaultMerger(obj, { foo: "baz" })).toEqual({ foo: "baz" })
    expect(obj).toEqual({ foo: "bar" })
    expect(defaultMerger(obj, { yolo: "swag" })).toEqual({
      foo: "bar",
      yolo: "swag",
    })
    expect(defaultMerger(obj, null as any)).toEqual(null)
  })
})
