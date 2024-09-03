import { describe, expect, test } from "@javarome/testscript"
import { HtmlTable } from "./HtmlTable"

describe("HtmlTable", () => {

  test("default day of month title with handler", async () => {
    const objects = [
      {key1: "value11", key2: "value12"},
      {key1: "value21", key2: "value22"}
    ]
    expect(HtmlTable.create(objects)).toBe(
      "<table><thead><tr><th>key1</th><th>key2</th></tr></thead><tbody><tr><td>value11</td><td>value12</td></tr><tr><td>value21</td><td>value22</td></tr></tbody></table>")
  })
})
