import { beforeEach, describe, expect, test } from "@javarome/testscript"
import { RR0SsgContext } from "../../../../RR0SsgContext.js"
import { rr0TestUtil } from "../../../../test/RR0TestUtil.js"
import { idfMessages } from "../../../eu/fr/region/idf/IdfMessages.js"
import { france_fr } from "../../../eu/fr/France_fr.js"
import { hautsDeSeineMessages } from "../../../eu/fr/region/idf/92/HautsDeSeineMessages.js"
import { hautsDeSeine } from "../../../eu/fr/region/idf/92/HautsDeSeine.js"

describe("DepartmentMessages", () => {

  let context: RR0SsgContext

  beforeEach(() => {
    context = rr0TestUtil.newContext("time/1/9/7/0/03/index.html")
  })

  test("toTitle", () => {
    expect(hautsDeSeineMessages.toTitle(context, hautsDeSeine, {parent: false})).toBe(hautsDeSeineMessages.title)
  })

  /*  test("toTitle with region", () => {
      expect(hautsDeSeineMessages.toTitle(context, hautsDeSeine, {parent: true})).toBe(
        `${hautsDeSeineMessages.title}, ${idfMessages.title}`)
    })*/

  test("toTitle with region and country", () => {
    expect(hautsDeSeineMessages.toTitle(context, hautsDeSeine, {parent: true})).toBe(
      `${hautsDeSeineMessages.title}, ${idfMessages.title}, ${france_fr.title}`)
  })
})
