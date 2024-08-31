import { TimeContext } from "../../TimeContext"
import { sceauDatasource } from "./SceauRR0Mapping"
import { SceauCaseSummary } from "./SceauCaseSummary"

export const sceauTestCases: SceauCaseSummary[] = [
  {
    id: "40",
    url: new URL("ufodata.php?u=40&p=1&sid=", sceauDatasource.baseUrl).href,
    sightingPlace: "Kotini kylänlahden VR:n talo, opiston lähellä",
    city: "Pielisjärvi",
    dateTime: new TimeContext(1970, 11, 1),
    dateTimeRefinement: "Oli talvi, pimeä vuodenaika arvio marraskuu, mielestäni1970",
    classification: "8LIV7Y3"
  },
  {
    id: "1818",
    url: new URL("ufodata.php?u=1818&p=1&sid=", sceauDatasource.baseUrl).href,
    sightingPlace: "Märjälahden ranta",
    city: "Pielisjärvi Lieksa",
    dateTime: new TimeContext(1970, 11, 1),
    classification: "7VAP7Y3"
  }
]
