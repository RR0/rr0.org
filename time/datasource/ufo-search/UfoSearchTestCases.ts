import { UfoSearchCase, UfoSearchCaseType } from "./UfoSearchCase"
import { ufoSearchHttpDatasource } from "./UfoSearchMapping"
import { TimeContext } from "../../TimeContext"

export const ufoSearchTestCases: UfoSearchCase[] = [
  {
    id: "979AEFAA",
    dateTime: new TimeContext(0),
    desc: "Greek and Roman records of UFO's",
    key_vals: {
      url: new URL("timeline.html#979AEFAA", ufoSearchHttpDatasource.baseUrl)
    },
    ref: "[Keziah Poster](https://github.com/richgel999/uap_resources/blob/main/Keziah58.pdf)",
    search: "greek roman record ufo keziah poster",
    source: "Maj2",
    source_id: "Maj2_1",
    type: UfoSearchCaseType.sighting
  },
  {
    id: "F91D10A9",
    dateTime: new TimeContext(34, 4),
    desc: "A white, round object, accompanied by 10 small stars, flew overhead. The pattern suggests the stars might have been in formation with the main object, making it an unusual possible meteor event.",
    key_vals: {
      url: new URL("timeline.html#F91D10A9", ufoSearchHttpDatasource.baseUrl)
    },
    location: "China",
    ref: "[_Wonders in the Sky: Unexplained Aerial Objects From Antiquity To Modern Times_, by Jacques Vallée and Chris Aubeck, 2009](https://archive.org/details/JacquesValleeChrisAubeckWondersInTheSkyUnexplainedAerialObjectsFromAntiquityToModernTimes/mode/2up)",
    search: "white round object accompani 10 small star flew overhead pattern suggest star might format main object make unusu possibl meteor event wonder sky unexplain aerial object antiqu modern time jacqu valle chri aubeck 2009 china",
    source: "WondersInTheSky",
    source_id: "WondersInTheSky_23",
    type: UfoSearchCaseType.sighting
  }
]
