import { beforeEach, describe, expect, test } from "@javarome/testscript"
import { cityService } from "./CityService"
import { RR0SsgContext } from "../../../../../RR0SsgContext"
import { rr0TestUtil } from "../../../../../test/RR0TestUtil"
import { hautsDeSeine } from "../../../../eu/fr/region/idf/92/HautsDeSeine"
import { sanDiego } from "../../../../us/region/ca/sandiego/SanDiego"
import { oceanSide } from "../../../../us/region/ca/sandiego/OceanSide"
import { nanterre92 } from "../../../../eu/fr/region/idf/92/Nanterre92"

describe("Ville", () => {

  let context: RR0SsgContext

  beforeEach(() => {
    context = rr0TestUtil.newContext("time/1/9/7/0/03/index.html")
  })

  test("find", () => {
    expect(cityService.find(context, "Nanterre", hautsDeSeine)).toBe(nanterre92)
    expect(cityService.find(context, "Nanterre", undefined)).toBe(nanterre92)
    expect(cityService.find(context, "Oceanside", sanDiego)).toBe(oceanSide)
    expect(cityService.find(context, "Oceanside", undefined)).toBe(oceanSide)
  })
})
