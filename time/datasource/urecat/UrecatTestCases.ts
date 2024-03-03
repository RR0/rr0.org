import { UrecatCase } from "./UrecatCase"
import { TimeContext } from "../../TimeContext"
import { rr0TestUtil } from "../../../test/RR0TestUtil"

export const urecatTestCases: UrecatCase[] = [
  {
    title: "12 MARS 1977, GISBORNE, GISBORNE DISTRICT COUNCIL, NOUVELLE ZELANDE, TROIS FEMMES",
    basicInfo: {
      base: {
        sightingDate: new TimeContext(rr0TestUtil.intlOptions, 1977, 3, 12),
        location: {
          placeName: "Gisborne",
          departmentOrState: "Gisborne District Council",
          country: "Nouvelle Zélande"
        },
        witnesses: [
          {name: "femme 1"},
          {name: "femme 2"},
          {name: "femme 3"}
        ]
      }
    },
    url: new URL("https://ufologie.patrickgross.org/ce3/1977-03-12-nzealand-gisbornef.htm")
  },
  {
    title: "4 MARS 1977, SUNDOWN, MANITOBA, CANADA, UN HOMME",
    basicInfo: {
      base: {
        sightingDate: new TimeContext(rr0TestUtil.intlOptions, 1977, 3, 4),
        location: {
          placeName: "Sundown",
          departmentOrState: "Manitoba",
          country: "Canada"
        },
        witnesses: [
          {name: "homme"}
        ]
      }
    },
    url: new URL("https://ufologie.patrickgross.org/ce3/1977-03-04-canada-sundownf.htm")
  }
]
