import { beforeEach, describe, expect, test } from "@javarome/testscript"
import { RR0SsgContext } from "../../../../../RR0SsgContext"
import { rr0TestUtil } from "../../../../../test/RR0TestUtil"
import { france_fr } from "../../../../eu/fr/France_fr"
import { nanterreMessages } from "../../../../eu/fr/region/idf/92/Nanterre/NanterreMessages"
import { nanterre92 } from "../../../../eu/fr/region/idf/92/Nanterre/Nanterre"
import { castlegar } from "../../../../ca/region/bc/rdck/Castlegar/Castlegar"
import { castlegarMessages } from "../../../../ca/region/bc/rdck/Castlegar/CastegarMessages"
import { hautsDeSeineMessages } from "../../../../eu/fr/region/idf/92/HautsDeSeineMessages"
import { kootenaysMessages_fr } from "../../../../ca/region/bc/rdck/KootenaysMessages_fr"
import { idfMessages } from "../../../../eu/fr/region/idf/IdfMessages"
import { britishColumbiaMessages_fr } from "../../../../ca/region/bc/BritishColumbiaMessages_fr"
import { canada_fr } from "../../../../ca/Canada_fr"

describe("CityMessages", () => {

  let context: RR0SsgContext

  beforeEach(() => {
    context = rr0TestUtil.newContext("time/1/9/7/0/03/index.html")
  })

  test("toTitle", () => {
    expect(castlegarMessages.toTitle(context, castlegar, {parent: false})).toBe(castlegarMessages.title)
    expect(nanterreMessages.toTitle(context, nanterre92, {parent: false})).toBe(nanterreMessages.title)
  })

  test("toTitle with department", () => {
    expect(castlegarMessages.toTitle(context, castlegar, {parent: true})).toBe(
      `${castlegarMessages.title} (${kootenaysMessages_fr.title})`)
    expect(nanterreMessages.toTitle(context, nanterre92, {parent: true})).toBe(
      `${nanterreMessages.title} (${hautsDeSeineMessages.title})`)
  })

  test("toTitle with department and region", () => {
    expect(castlegarMessages.toTitle(context, castlegar, {parent: true})).toBe(
      `${castlegarMessages.title} (${kootenaysMessages_fr.title}, ${britishColumbiaMessages_fr.title})`)
    expect(nanterreMessages.toTitle(context, nanterre92, {parent: true})).toBe(
      `${nanterreMessages.title} (${hautsDeSeineMessages.title}, ${idfMessages.title})`)
  })

  test("toTitle with department and region and country", () => {
    expect(castlegarMessages.toTitle(context, castlegar,
      {parent: true})).toBe(
      `${castlegarMessages.title} (${kootenaysMessages_fr.title}, ${britishColumbiaMessages_fr.title}, ${canada_fr.title})`)
    expect(nanterreMessages.toTitle(context, nanterre92,
      {parent: true})).toBe(
      `${nanterreMessages.title} (${hautsDeSeineMessages.title}, ${idfMessages.title}, ${france_fr.title})`)
  })
})
