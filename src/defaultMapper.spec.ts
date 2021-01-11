import { defaultMapper } from "./defaultMapper"

describe("defaultMapper", () => {
  it("maps state", () => {
    const obj = { foo: "bar" }

    expect(defaultMapper(obj)).toBe(obj)
  })
})
