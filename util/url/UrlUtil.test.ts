import {UrlUtil} from "./UrlUtil"
import { describe, expect, test } from '@javarome/testscript';

describe("UrlUtil", function () {
  test("absolute", () => {
    expect(UrlUtil.absolute("time")).toBe("/time/")
    expect(UrlUtil.absolute("time/")).toBe("/time/")
    expect(UrlUtil.absolute("/time")).toBe("/time/")
  })
})
