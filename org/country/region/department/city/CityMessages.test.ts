import { beforeEach, describe, expect, test } from "@javarome/testscript"
import { RR0SsgContext } from "../../../../../RR0SsgContext.js"
import { rr0TestUtil } from "../../../../../test/RR0TestUtil.js"
import { france_fr } from "../../../../eu/fr/France_fr.js"
import { nanterreMessages } from "../../../../eu/fr/region/idf/92/Nanterre/NanterreMessages.js"
import { nanterre92 } from "../../../../eu/fr/region/idf/92/Nanterre/Nanterre.js"
import { castlegar } from "../../../../ca/region/bc/rdck/Castlegar/Castlegar.js"
import { castlegarMessages } from "../../../../ca/region/bc/rdck/Castlegar/CastegarMessages.js"
import { hautsDeSeineMessages } from "../../../../eu/fr/region/idf/92/HautsDeSeineMessages.js"
import { kootenaysMessages_fr } from "../../../../ca/region/bc/rdck/KootenaysMessages_fr.js"
import { idfMessages } from "../../../../eu/fr/region/idf/IdfMessages.js"
import { britishColumbiaMessages_fr } from "../../../../ca/region/bc/BritishColumbiaMessages_fr.js"
import { canada_fr } from "../../../../ca/Canada_fr.js"

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
