import { beforeEach, describe, expect, test } from "@javarome/testscript"
import { france_fr } from "../eu/fr/France_fr"
import { rr0TestUtil } from "../../test/RR0TestUtil"
import { RR0SsgContext } from "../../RR0SsgContext"
import { france_en } from "../eu/fr/France_en"
import { usa_fr } from "../us/Usa_fr"
import { usa_en } from "../us/Usa_en"
import { france } from "../eu/fr/France"
import { usa } from "../us/Usa"

describe("CountryMessages", () => {

  let context: RR0SsgContext

  beforeEach(() => {
    context = rr0TestUtil.newContext("time/1/9/7/0/03/index.html")
  })

  test("toTitle", () => {
    expect(france_fr.toTitle(context, france, {parent: false})).toBe(france_fr.title)
    expect(france_en.toTitle(context, france, {parent: false})).toBe(france_en.title)
    expect(usa_fr.toTitle(context, usa, {parent: false})).toBe(usa_fr.title)
    expect(usa_en.toTitle(context, usa, {parent: false})).toBe(usa_en.title)
  })
})
