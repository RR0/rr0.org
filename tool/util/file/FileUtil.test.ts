import {dirToTitle} from "./FileUtil"

describe("FileUtil", () => {

  test("dir to title", () => {
    expect(dirToTitle("dir")).toBe("Dir")
    expect(dirToTitle("dirToTitle")).toBe("Dir To Title")
    expect(dirToTitle("Project1947")).toBe("Project 1947")
    expect(dirToTitle("STS48")).toBe("STS 48")
  })
})
