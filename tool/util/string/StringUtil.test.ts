import {StringUtil} from "./StringUtil"

describe("StringUtil", () => {

  test("textToCamel", () => {
    expect(StringUtil.textToCamel("Jérôme ça va ?")).toBe("JeromeCaVa")
  })
})
