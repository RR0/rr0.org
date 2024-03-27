import { FuforaCaseSummary } from "./FuforaCaseSummary"
import { TimeContext } from "../../TimeContext"
import { rr0TestUtil } from "../../../test/RR0TestUtil"
import { fuforaDatasource } from "./FuforaRR0Mapping"

export const fuforaTestCases: FuforaCaseSummary[] = [
  {
    id: "40",
    url: new URL("ufodata.php?u=40&p=1&sid=", fuforaDatasource.baseUrl),
    sightingPlace: "Kotini kylänlahden VR:n talo, opiston lähellä",
    city: "Pielisjärvi",
    dateTime: new TimeContext(rr0TestUtil.intlOptions, 1970, 11, 1),
    dateTimeRefinement: "Oli talvi, pimeä vuodenaika arvio marraskuu, mielestäni1970",
    classification: "8LIV7Y3"
  },
  {
    id: "1818",
    url: new URL("ufodata.php?u=1818&p=1&sid=", fuforaDatasource.baseUrl),
    sightingPlace: "Märjälahden ranta",
    city: "Pielisjärvi Lieksa",
    dateTime: new TimeContext(rr0TestUtil.intlOptions, 1970, 11, 1),
    classification: "7VAP7Y3"
  }
]
