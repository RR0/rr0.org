import { describe, expect, test } from "@javarome/testscript"
import { regionService } from "./RegionService.js"
import { ileDeFrance } from "../../eu/fr/region/idf/Idf.js"
import { france } from "../../eu/fr/France.js"
import { alabama } from "../../us/region/al/Alabama.js"
import { usa } from "../../us/Usa.js"

describe("RegionService", () => {

  test("get", () => {
    expect(regionService.get(ileDeFrance.id, france)).toBe(ileDeFrance)
    expect(regionService.get(alabama.id, usa)).toBe(alabama)
    expect(regionService.get(alabama.id, france)).toBeUndefined()
  })
})
