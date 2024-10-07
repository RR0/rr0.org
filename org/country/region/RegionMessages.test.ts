import { beforeEach, describe, expect, test } from "@javarome/testscript"
import { RR0SsgContext } from "../../../RR0SsgContext.js"
import { rr0TestUtil } from "../../../test/RR0TestUtil.js"
import { idfRegionMessages_fr } from "../../eu/fr/region/idf/IdfMessages.js"
import { ileDeFrance } from "../../eu/fr/region/idf/Idf.js"

describe("RegionMessages", () => {

  let context: RR0SsgContext

  beforeEach(() => {
    context = rr0TestUtil.newContext("time/1/9/7/0/03/index.html")
  })

  test("toTitle", () => {
    expect(idfRegionMessages_fr.toTitle(context, ileDeFrance)).toBe(idfRegionMessages_fr.title)
  })

  test("toTitle with country", () => {
    expect(idfRegionMessages_fr.toTitle(context, ileDeFrance, {country: true})).toBe(
      `${idfRegionMessages_fr.title}, ${france_fr.title}`)
  })
})
