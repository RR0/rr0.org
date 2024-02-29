import { beforeEach, describe, expect, test } from "@javarome/testscript"
import { RR0SsgContext } from "../../../../RR0SsgContext"
import { rr0TestUtil } from "../../../../test/RR0TestUtil"
import { idfMessages } from "../../../eu/fr/region/idf/IdfMessages"
import { franceMessages_fr } from "../../../eu/fr/FranceMessages_fr"
import { hautsDeSeineMessages } from "../../../eu/fr/region/idf/92/HautsDeSeineMessages"
import { hautsDeSeine } from "../../../eu/fr/region/idf/92/HautsDeSeine"

describe("DepartmentMessages", () => {

  let context: RR0SsgContext

  beforeEach(() => {
    context = rr0TestUtil.newContext("time/1/9/7/0/03/index.html")
  })

  test("toTitle", () => {
    expect(hautsDeSeineMessages.toTitle(context, hautsDeSeine)).toBe(hautsDeSeineMessages.title)
  })

  test("toTitle with region", () => {
    expect(hautsDeSeineMessages.toTitle(context, hautsDeSeine, {region: true})).toBe(
      `${hautsDeSeineMessages.title}, ${idfMessages.title}`)
  })

  test("toTitle with region and country", () => {
    expect(hautsDeSeineMessages.toTitle(context, hautsDeSeine, {region: true, country: true})).toBe(
      `${hautsDeSeineMessages.title}, ${idfMessages.title}, ${franceMessages_fr.title}`)
  })
})
