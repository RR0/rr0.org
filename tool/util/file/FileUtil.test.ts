import {camelToText} from "./FileUtil"

describe("FileUtil", () => {

  test("dir to title", () => {
    expect(camelToText("dir")).toBe("Dir")
    expect(camelToText("dirToTitle")).toBe("Dir To Title")
    expect(camelToText("Project1947")).toBe("Project 1947")
    expect(camelToText("STS48")).toBe("STS 48")

    expect(camelToText("camelCase")).toBe("Camel Case")
    expect(camelToText("superSimpleExample")).toBe("Super Simple Example")
    /*expect(camelToText("goodNumber90text")).toBe("Good Number 90 Text")
    expect(camelToText("aGoodIPAddress")).toBe("A Good IP Address")
    expect(camelToText("camelTOPCase")).toBe("Camel TOP Case")
    expect(camelToText("bad132Number90text")).toBe("Bad 132 Number 90 Text")
    expect(camelToText("aP2PConnection")).toBe("A P2P Connection")*/
  })
})
