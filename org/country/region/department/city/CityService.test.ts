import { beforeEach, describe, expect, test } from "@javarome/testscript"
import { RR0SsgContext } from "../../../../../RR0SsgContext.js"
import { rr0TestUtil } from "../../../../../test/RR0TestUtil.js"
import { hautsDeSeine } from "../../../../eu/fr/region/idf/92/HautsDeSeine.js"
import { sanDiego } from "../../../../us/region/ca/sandiego/SanDiego.js"
import { cityService } from "../../../../Cities.js"
import { nanterre92 } from "../../../../eu/fr/region/idf/92/Nanterre/Nanterre.js"
import { oceanSide } from "../../../../us/region/ca/sandiego/oceanside/OceanSide.js"

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
