import { beforeEach, describe, expect, test } from "@javarome/testscript"
import { RR0SsgContext } from "../../../../../RR0SsgContext"
import { rr0TestUtil } from "../../../../../test/RR0TestUtil"
import { franceMessages_fr } from "../../../../eu/fr/FranceMessages_fr"
import { nanterreMessages_fr } from "../../../../eu/fr/region/idf/92/nanterre/NanterreMessages_fr"
import { nanterre92 } from "../../../../eu/fr/region/idf/92/nanterre/Nanterre"
import { castlegar } from "../../../../ca/region/bc/rdck/Castlegar/Castlegar"
import { castlegarMessages_fr } from "../../../../ca/region/bc/rdck/Castlegar/CastegarMessages_fr"
import { hautsDeSeineMessages_fr } from "../../../../eu/fr/region/idf/92/HautsDeSeineMessages_fr"
import { kootenaysMessages_fr } from "../../../../ca/region/bc/rdck/KootenaysMessages_fr"
import { idfRegionMessages_fr } from "../../../../eu/fr/region/idf/IdfRegionMessages_fr"
import { britishColumbiaMessages_fr } from "../../../../ca/region/bc/BritishColumbiaMessages_fr"
import { canadaMessages_fr } from "../../../../ca/CanadaMessages_fr"

describe("CityMessages", () => {

  let context: RR0SsgContext

  beforeEach(() => {
    context = rr0TestUtil.newContext("time/1/9/7/0/03/index.html")
  })

  test("toTitle", () => {
    expect(castlegarMessages_fr.toTitle(context, castlegar)).toBe(castlegarMessages_fr.title)
    expect(nanterreMessages_fr.toTitle(context, nanterre92)).toBe(nanterreMessages_fr.title)
  })

  test("toTitle with department", () => {
    expect(castlegarMessages_fr.toTitle(context, castlegar, {department: true})).toBe(
      `${castlegarMessages_fr.title} (${kootenaysMessages_fr.title})`)
    expect(nanterreMessages_fr.toTitle(context, nanterre92, {department: true})).toBe(
      `${nanterreMessages_fr.title} (${hautsDeSeineMessages_fr.title})`)
  })

  test("toTitle with department and region", () => {
    expect(castlegarMessages_fr.toTitle(context, castlegar, {department: true, region: true})).toBe(
      `${castlegarMessages_fr.title} (${kootenaysMessages_fr.title}, ${britishColumbiaMessages_fr.title})`)
    expect(nanterreMessages_fr.toTitle(context, nanterre92, {department: true, region: true})).toBe(
      `${nanterreMessages_fr.title} (${hautsDeSeineMessages_fr.title}, ${idfRegionMessages_fr.title})`)
  })

  test("toTitle with department and region and country", () => {
    expect(castlegarMessages_fr.toTitle(context, castlegar,
      {department: true, region: true, country: true})).toBe(
      `${castlegarMessages_fr.title} (${kootenaysMessages_fr.title}, ${britishColumbiaMessages_fr.title}, ${canadaMessages_fr.title})`)
    expect(nanterreMessages_fr.toTitle(context, nanterre92,
      {department: true, region: true, country: true})).toBe(
      `${nanterreMessages_fr.title} (${hautsDeSeineMessages_fr.title}, ${idfRegionMessages_fr.title}, ${franceMessages_fr.title})`)
  })
})
