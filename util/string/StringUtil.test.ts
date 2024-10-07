import { describe, expect, test } from "@javarome/testscript"
import { StringUtil } from "./StringUtil.js"

describe("StringUtil", () => {

  test("textToCamel", () => {
    expect(StringUtil.textToCamel("Jérôme ça va ?")).toBe("JeromeCaVa")
  })

  test("camelToText", () => {
    expect(StringUtil.camelToText("dir")).toBe("Dir")
    expect(StringUtil.camelToText("dirToTitle")).toBe("Dir To Title")
    expect(StringUtil.camelToText("Project1947")).toBe("Project 1947")
    expect(StringUtil.camelToText("STS48")).toBe("STS 48")

    expect(StringUtil.camelToText("camelCase")).toBe("Camel Case")
    expect(StringUtil.camelToText("superSimpleExample")).toBe("Super Simple Example")
    expect(StringUtil.camelToText("AltschulerMartinD")).toBe("Altschuler Martin D.")
    //expect(camelToText("BakerRogerML")).toBe("Baker Roger M. L.")
    /*expect(camelToText("goodNumber90text")).toBe("Good Number 90 Text")
    expect(camelToText("aGoodIPAddress")).toBe("A Good IP Address")
    expect(camelToText("camelTOPCase")).toBe("Camel TOP Case")
    expect(camelToText("bad132Number90text")).toBe("Bad 132 Number 90 Text")
    expect(camelToText("aP2PConnection")).toBe("A P2P Connection")*/
  })
})
