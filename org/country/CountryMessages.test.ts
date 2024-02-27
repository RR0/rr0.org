import { beforeEach, describe, expect, test } from "@javarome/testscript"
import { franceMessages_fr } from "../eu/fr/FranceMessages_fr"
import { rr0TestUtil } from "../../test/RR0TestUtil"
import { RR0SsgContext } from "../../RR0SsgContext"
import { franceMessages_en } from "../eu/fr/FranceMessages_en"
import { usaMessages_fr } from "../us/UsaMessages_fr"
import { usaMessages_en } from "../us/UsaMessages_en"

describe("CountryMessages", () => {

  let context: RR0SsgContext

  beforeEach(() => {
    context = rr0TestUtil.newContext("time/1/9/7/0/03/index.html")
  })

  test("toTitle", () => {
    expect(franceMessages_fr.toTitle(context)).toBe(franceMessages_fr.title)
    expect(franceMessages_en.toTitle(context)).toBe(franceMessages_en.title)
    expect(usaMessages_fr.toTitle(context)).toBe(usaMessages_fr.title)
    expect(usaMessages_en.toTitle(context)).toBe(usaMessages_en.title)
  })
})
