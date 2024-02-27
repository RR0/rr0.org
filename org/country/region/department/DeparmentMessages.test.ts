import { beforeEach, describe, expect, test } from "@javarome/testscript"
import { RR0SsgContext } from "../../../../RR0SsgContext"
import { rr0TestUtil } from "../../../../test/RR0TestUtil"
import { franceDepartments } from "../../../eu/fr/region/FranceDepartments"
import { hautDeSeineDepartmentMessages_fr } from "../../../eu/fr/region/idf/92/HautDeSeineDepartmentMessages_fr"
import { idfRegionMessages_fr } from "../../../eu/fr/region/idf/IdfRegionMessages_fr"
import { franceMessages_fr } from "../../../eu/fr/FranceMessages_fr"

describe("DepartmentMessages", () => {

  let context: RR0SsgContext

  beforeEach(() => {
    context = rr0TestUtil.newContext("time/1/9/7/0/03/index.html")
  })

  test("toTitle", () => {
    expect(hautDeSeineDepartmentMessages_fr.toTitle(context, franceDepartments.HautDeSeine)).toBe(
      hautDeSeineDepartmentMessages_fr.title)
  })

  test("toTitle with region", () => {
    expect(hautDeSeineDepartmentMessages_fr.toTitle(context, franceDepartments.HautDeSeine, {region: true})).toBe(
      `${hautDeSeineDepartmentMessages_fr.title}, ${idfRegionMessages_fr.title}`)
  })

  test("toTitle with region and country", () => {
    expect(hautDeSeineDepartmentMessages_fr.toTitle(context, franceDepartments.HautDeSeine,
      {region: true, country: true})).toBe(
      `${hautDeSeineDepartmentMessages_fr.title}, ${idfRegionMessages_fr.title}, ${franceMessages_fr.title}`)
  })
})
