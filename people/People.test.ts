import { People } from "./People"
import { PeopleService } from "./PeopleService"
import { beforeAll, describe, expect, test } from "@javarome/testscript"
import { promise as glob } from "glob-promise"
import { AllDataService } from "../data/AllDataService"

describe("People", () => {

  let service: PeopleService

  beforeAll(async () => {
    const peopleFiles = await glob("people/*/*")
    service = new PeopleService(peopleFiles, new AllDataService([], []), peopleFactory)
  })

  test("age", async () => {
    const hynek = service.createFromDirName("HynekJosefAllen")
    expect(hynek.isDeceased()).toBe(false)
    expect(hynek.getAge()).toBe(undefined)

    hynek.birthTime = new Date("1910-05-01")
    expect(hynek.isDeceased()).toBe(false)
    expect(hynek.isDeceased(new Date("2040"))).toBe(true)
    expect(hynek.getAge(new Date("1972-08-12"))).toBe(62)

    hynek.deathTime = new Date("1986-04-27")
    expect(hynek.isDeceased()).toBe(true)
    expect(hynek.getAge(new Date("1986-04-27"))).toBe(76)
    expect(hynek.getAge(new Date("2020-04-27"))).toBe(76)
  })

  test("build url", () => {
    expect(People.getUrl("Beau", ["Jérôme"])).toBe("people/b/BeauJerome")
    expect(People.getUrl("Beau", ["Jérôme", "Pierre"])).toBe("people/b/BeauJeromePierre")
    expect(People.getUrl("VonBraun", ["Werner"])).toBe("people/v/VonBraunWerner")
  })
})
