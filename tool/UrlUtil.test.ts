import {UrlUtil} from "./UrlUtil"

describe("UrlUtil", function () {
  test("absolute", () => {
    expect(UrlUtil.absolute("time")).toBe("/time/")
    expect(UrlUtil.absolute("time/")).toBe("/time/")
    expect(UrlUtil.absolute("/time")).toBe("/time/")
  })
})
