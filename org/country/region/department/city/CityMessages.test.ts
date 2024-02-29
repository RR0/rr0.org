import { beforeEach, describe, expect, test } from "@javarome/testscript"
import { RR0SsgContext } from "../../../../../RR0SsgContext"
import { rr0TestUtil } from "../../../../../test/RR0TestUtil"
import { franceMessages_fr } from "../../../../eu/fr/FranceMessages_fr"
import { nanterreMessages } from "../../../../eu/fr/region/idf/92/nanterre/NanterreMessages"
import { nanterre92 } from "../../../../eu/fr/region/idf/92/nanterre/Nanterre"
import { castlegar } from "../../../../ca/region/bc/rdck/Castlegar/Castlegar"
import { castlegarMessages_fr } from "../../../../ca/region/bc/rdck/Castlegar/CastegarMessages_fr"
import { hautsDeSeineMessages } from "../../../../eu/fr/region/idf/92/HautsDeSeineMessages"
import { kootenaysMessages_fr } from "../../../../ca/region/bc/rdck/KootenaysMessages_fr"
import { idfMessages } from "../../../../eu/fr/region/idf/IdfMessages"
import { britishColumbiaMessages_fr } from "../../../../ca/region/bc/BritishColumbiaMessages_fr"
import { canadaMessages_fr } from "../../../../ca/CanadaMessages_fr"

describe("CityMessages", () => {

  let context: RR0SsgContext

  beforeEach(() => {
    context = rr0TestUtil.newContext("time/1/9/7/0/03/index.html")
  })

  test("toTitle", () => {
    expect(castlegarMessages_fr.toTitle(context, castlegar)).toBe(castlegarMessages_fr.title)
    expect(nanterreMessages.toTitle(context, nanterre92)).toBe(nanterreMessages.title)
  })

  test("toTitle with department", () => {
    expect(castlegarMessages_fr.toTitle(context, castlegar, {parent: true})).toBe(
      `${castlegarMessages_fr.title} (${kootenaysMessages_fr.title})`)
    expect(nanterreMessages.toTitle(context, nanterre92, {parent: true})).toBe(
      `${nanterreMessages.title} (${hautsDeSeineMessages.title})`)
  })

  test("toTitle with department and region", () => {
    expect(castlegarMessages_fr.toTitle(context, castlegar, {parent: true, region: true})).toBe(
      `${castlegarMessages_fr.title} (${kootenaysMessages_fr.title}, ${britishColumbiaMessages_fr.title})`)
    expect(nanterreMessages.toTitle(context, nanterre92, {parent: true, region: true})).toBe(
      `${nanterreMessages.title} (${hautsDeSeineMessages.title}, ${idfMessages.title})`)
  })

  test("toTitle with department and region and country", () => {
    expect(castlegarMessages_fr.toTitle(context, castlegar,
      {parent: true, region: true, country: true})).toBe(
      `${castlegarMessages_fr.title} (${kootenaysMessages_fr.title}, ${britishColumbiaMessages_fr.title}, ${canadaMessages_fr.title})`)
    expect(nanterreMessages.toTitle(context, nanterre92,
      {parent: true, region: true, country: true})).toBe(
      `${nanterreMessages.title} (${hautsDeSeineMessages.title}, ${idfMessages.title}, ${franceMessages_fr.title})`)
  })
})
