import { UrecatCase } from "./UrecatCase"
import { TimeContext } from "../../TimeContext"
import { rr0TestUtil } from "../../../test/RR0TestUtil"

const noWeekdayOptions = {...rr0TestUtil.intlOptions}
noWeekdayOptions.weekday = undefined

export const urecatTestCases: UrecatCase[] = [
  {
    id: "1977-03-12-nzealand-gisbornef.htm",
    dateTime: new TimeContext(1977, 3, 12),
    url: new URL("https://ufologie.patrickgross.org/ce3/1977-03-12-nzealand-gisbornef.htm"),
    // title: "12 MARS 1977, GISBORNE, GISBORNE DISTRICT COUNCIL, NOUVELLE ZELANDE, TROIS FEMMES",
    title: "12 MARS 1977, GISBORNE, GISBORNE DISTRICT COUNCIL, NOUVELLE ZÉLANDE, TROIS PERSONNES",
    basicInfo: {
      base: {
        sightingDate: new TimeContext(1977, 3, 12),
        location: {
          placeName: "Gisborne",
          country: "Nouvelle Zélande",
          departmentOrState: "Gisborne District Council"
        },
        witnesses: [
          {name: "femme 1"},
          {name: "femme 2"},
          {name: "femme 3"}
        ]
      }
    }
  },
  {
    id: "1977-03-04-canada-sundownf.htm",
    dateTime: new TimeContext(1977, 3, 4),
    url: new URL("https://ufologie.patrickgross.org/ce3/1977-03-04-canada-sundownf.htm"),
//    title: "4 MARS 1977, SUNDOWN, MANITOBA, CANADA, UN HOMME",
    title: "4 MARS 1977, SUNDOWN, MANITOBA, CANADA, UNE PERSONNE",
    basicInfo: {
      base: {
        sightingDate: new TimeContext(1977, 3, 4),
        location: {
          placeName: "Sundown",
          country: "Canada",
          departmentOrState: "Manitoba"
        },
        witnesses: [
          {name: "Un homme"}
        ]
      }
    }
  }
]
