import { beforeEach, describe, expect, test } from "@javarome/testscript"
import { RR0SsgContext } from "../../../RR0SsgContext"
import { rr0TestUtil } from "../../../test/RR0TestUtil"
import { idfRegionMessages_fr } from "../../eu/fr/region/idf/IdfRegionMessages_fr"
import { franceRegions } from "../../eu/fr/region/IleDeFrance"
import { franceMessages_fr } from "../../eu/fr/FranceMessages_fr"

describe("RegionMessages", () => {

  let context: RR0SsgContext

  beforeEach(() => {
    context = rr0TestUtil.newContext("time/1/9/7/0/03/index.html")
  })

  test("toTitle", () => {
    expect(idfRegionMessages_fr.toTitle(context, franceRegions.ileDeFrance)).toBe(idfRegionMessages_fr.title)
  })

  test("toTitle with country", () => {
    expect(idfRegionMessages_fr.toTitle(context, franceRegions.ileDeFrance, {country: true})).toBe(
      `${idfRegionMessages_fr.title}, ${franceMessages_fr.title}`)
  })
})
