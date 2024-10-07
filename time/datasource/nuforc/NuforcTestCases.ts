import { NuforcCaseSummary } from "./NuforcCaseSummary.js"
import { nuforcDatasource } from "./NuforcRR0Mapping.js"
import { TimeContext } from "../../TimeContext.js"
import { NuforcState } from "./NuforcState.js"
import { NuforcCountry } from "./NuforcCountry.js"
import { NuforcShape } from "./NuforcShape.js"

export const nuforcTestCases: NuforcCaseSummary[] = [
  {
    id: "34046",
    url: new URL("/sighting/?id=34046", nuforcDatasource.baseUrl).href,
    city: "Slocomb",
    state: NuforcState.Alabama,
    country: NuforcCountry.USA,
    time: new TimeContext(1970, 3, 30, 21, 0),
    shape: NuforcShape.Circle,
    summary: "craft just above the trees moving slowly, silent,circular solid white light. witnessed by 5 of us",
    reportDate: new Date("12/21/2003"),
    postDate: new Date("01/17/2004"),
    image: false
  },
  {
    id: "44702",
    url: new URL("/sighting/?id=44702", nuforcDatasource.baseUrl).href,
    city: "Camp Pendleton",
    state: NuforcState.California,
    country: NuforcCountry.USA,
    time: new TimeContext(1970, 3, 21, 20, 0),
    shape: NuforcShape.Disk,
    summary: "While using night vison scopes , 28 Marines witness 3 saucer craft hovering near Camp Pendleton rifle range during night firing exersi",
    reportDate: new Date("07/01/2005"),
    postDate: new Date("07/05/2005"),
    image: false
  },
  {
    id: "35880",
    url: new URL("/sighting/?id=35880", nuforcDatasource.baseUrl).href,
    city: "Fort Worth",
    state: NuforcState.Texas,
    country: NuforcCountry.USA,
    time: new TimeContext(1970, 3, 20, 16, 0),
    shape: NuforcShape.Disk,
    summary: "Scintillating silvery, metallic object, probably disk-shaped, apparently changing attitude",
    reportDate: new Date("03/28/2004"),
    postDate: new Date("03/29/2004"),
    image: false
  },
  {
    id: "35488",
    url: new URL("/sighting/?id=35488", nuforcDatasource.baseUrl).href,
    city: "Castlegar (Canada)",
    state: NuforcState.BritishColumbia,
    country: NuforcCountry.Canada,
    time: new TimeContext(1970, 3, 15, 22, 0),
    shape: NuforcShape.Light,
    summary: "HBCCUFO CANADIAN REPORT:  At least seven, emerged from the light and were flying around the still stationary larger object.",
    reportDate: new Date("03/09/2004"),
    postDate: new Date("03/17/2004"),
    image: false
  },
  {
    id: "97066",
    url: new URL("/sighting/?id=97066", nuforcDatasource.baseUrl).href,
    city: "Monessen",
    state: NuforcState.Pennsylvania,
    country: NuforcCountry.USA,
    time: new TimeContext(1970, 3, 12, 3, 0),
    shape: NuforcShape.Cylinder,
    summary: "Probe Flourescent Bulb Sized Object.",
    reportDate: new Date("04/10/2013"),
    postDate: new Date("05/15/2013"),
    image: false
  },
  {
    id: "61361",
    url: new URL("/sighting/?id=61361", nuforcDatasource.baseUrl).href,
    city: "St. Petersburg",
    state: NuforcState.Florida,
    country: NuforcCountry.USA,
    time: new TimeContext(1970, 3, 10, 0, 0),
    shape: NuforcShape.Disk,
    summary: "Encounter with disked shape UFO on campus of Florida Presbyterian College with 30 others",
    reportDate: new Date("02/01/2008"),
    postDate: new Date("02/14/2008"),
    image: false
  },
  {
    id: "171536",
    url: new URL("/sighting/?id=171536", nuforcDatasource.baseUrl).href,
    city: "Bonney lake",
    state: NuforcState.Washington,
    country: NuforcCountry.USA,
    time: new TimeContext(1970, 3, 7, 9, 0),
    shape: NuforcShape.Circle,
    summary: "2 ufos 20ft and 5ft",
    reportDate: new Date("09/02/2022"),
    postDate: new Date("10/08/2022"),
    image: true
  }
]
