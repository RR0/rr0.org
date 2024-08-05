import { describe, expect, test } from "@javarome/testscript"
import { regionService } from "./RegionService"
import { ileDeFrance } from "../../eu/fr/region/idf/Idf"
import { france } from "../../eu/fr/France"
import { alabama } from "../../us/region/al/Alabama"
import { usa } from "../../us/Usa"

describe("RegionService", () => {

  test("get", () => {
    expect(regionService.get(ileDeFrance.id, france)).toBe(ileDeFrance)
    expect(regionService.get(alabama.id, usa)).toBe(alabama)
    expect(regionService.get(alabama.id, france)).toBeUndefined()
  })
})
