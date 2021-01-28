import { defaultMapper } from "./defaultMapper"

describe("defaultMapper", () => {
  it("maps value", () => {
    const obj = { foo: "bar" }

    expect(defaultMapper(obj)).toBe(obj)
  })
})
