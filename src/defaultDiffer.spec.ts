import { defaultDiffer } from "./defaultDiffer"

describe("defaultDiffer", () => {
  it("diffs value", () => {
    const obj = { foo: "bar", yolo: [1] }

    expect(defaultDiffer(obj, obj)).toBe(false)
    expect(defaultDiffer(obj, { ...obj })).toBe(false)
    expect(defaultDiffer(obj, { foo: "bar" })).toBe(true)
    expect(defaultDiffer(obj, { foo: "baz", yolo: [1] })).toBe(true)
    expect(defaultDiffer(obj, { foo: "bar", yolo: [2] })).toBe(true)
    expect(defaultDiffer(obj, { foo: "bar", yolo: [1, 2] })).toBe(true)
    expect(defaultDiffer({ foo: ["bar"] }, { foo: ["baz"] })).toBe(true)
  })
})
