import { describe, expect, test } from "@javarome/testscript"
import { FranceMessages } from "./FranceMessages"

describe("FranceMessages", () => {

  const fr = new FranceMessages("fr")

  test("cityName", () => {
    expect(fr.cityName("Paris")).toBe("Paris")
    expect(fr.cityName("Saint-Ouen")).toBe("St-Ouen")
    expect(fr.cityName("Sainte-Marie")).toBe("Ste-Marie")
    expect(fr.cityName("Sainte Marie")).toBe("Ste Marie")
  })
})
