import { describe, expect, test } from "@javarome/testscript"
import { countryService } from "./CountryService"
import { france } from "../eu/fr/France"
import { usa } from "../us/Usa"

describe("CountryService", () => {

  test("get", () => {
    expect(countryService.get(france.id)).toBe(france)
    expect(countryService.get(usa.id)).toBe(usa)
    expect(countryService.get(usa.id)).not.toBe(france)
  })
})
