import { describe, expect, test } from "@javarome/testscript"
import { departmentService } from "./DepartmentService"
import { hautsDeSeine } from "../../../eu/fr/region/idf/92/HautsDeSeine"
import { ileDeFrance } from "../../../eu/fr/region/idf/Idf"
import { sanDiego } from "../../../us/region/ca/sandiego/SanDiego"
import { california } from "../../../us/region/ca/California"

describe("DepartmentService", () => {

  test("get", () => {
    expect(departmentService.get(hautsDeSeine.id, ileDeFrance)).toBe(hautsDeSeine)
    expect(departmentService.get(hautsDeSeine.id, undefined)).toBe(hautsDeSeine)
    expect(departmentService.get(sanDiego.id, california)).toBe(sanDiego)
  })
})
