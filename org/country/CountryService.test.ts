import { describe, expect, test } from "@javarome/testscript"
import { countryService } from "./CountryService.js"
import { france } from "../eu/fr/France.js"
import { usa } from "../us/Usa.js"

describe("CountryService", () => {

  test("get", () => {
    expect(countryService.get(france.id)).toBe(france)
    expect(countryService.get(usa.id)).toBe(usa)
    expect(countryService.get(usa.id)).not.toBe(france)
  })
})
