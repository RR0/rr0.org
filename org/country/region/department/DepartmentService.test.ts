import { describe, expect, test } from "@javarome/testscript"
import { departmentService } from "./DepartmentService.js"
import { hautsDeSeine } from "../../../eu/fr/region/idf/92/HautsDeSeine.js"
import { ileDeFrance } from "../../../eu/fr/region/idf/Idf.js"
import { sanDiego } from "../../../us/region/ca/sandiego/SanDiego.js"
import { california } from "../../../us/region/ca/California.js"

describe("DepartmentService", () => {

  test("get", () => {
    expect(departmentService.get(hautsDeSeine.id, ileDeFrance)).toBe(hautsDeSeine)
    expect(departmentService.get(hautsDeSeine.id, undefined)).toBe(hautsDeSeine)
    expect(departmentService.get(sanDiego.id, california)).toBe(sanDiego)
  })
})
