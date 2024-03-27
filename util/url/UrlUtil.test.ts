import { UrlUtil } from "./UrlUtil"
import { describe, expect, test } from "@javarome/testscript"

describe("UrlUtil", function () {

  test("absolute", () => {
    expect(UrlUtil.absolute("time")).toBe("/time/")
    expect(UrlUtil.absolute("time/")).toBe("/time/")
    expect(UrlUtil.absolute("/time")).toBe("/time/")
  })

  test("join", () => {
    expect(UrlUtil.join("time", "1/9/7/0/03/index.html")).toBe("time/1/9/7/0/03/index.html")
    expect(UrlUtil.join("rr0.org/time", "1/9/7/0/03/index.html")).toBe("rr0.org/time/1/9/7/0/03/index.html")
    expect(UrlUtil.join("https://rr0.org/time", "1/9/7/0/03/index.html")).toBe(
      "https://rr0.org/time/1/9/7/0/03/index.html")
  })
})
