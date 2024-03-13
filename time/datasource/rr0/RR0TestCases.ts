import { TimeContext } from "../../TimeContext"
import { rr0TestUtil } from "../../../test/RR0TestUtil"
import { rr0Datasource } from "./RR0Mapping"
import { RR0CaseSummary } from "./RR0CaseSummary"
import { UrlUtil } from "../../../util/url/UrlUtil"

export const rr0TestCases: RR0CaseSummary[] = [
  {
    url: new URL(UrlUtil.join(rr0Datasource.searchPath, "1/9/7/0/03/index.html#1970-03-04"), rr0Datasource.baseUrl),
    time: new TimeContext(rr0TestUtil.intlOptions, 1970, 3, 4),
    description: "Disparition du sous-marin français Eurydice au large de Saint-Tropez, avec 50 hommes à bord. Ce bâtiment était conçu pour la lutte contre les sous-marins à propulsion nucléaire et ne lança pas le moindre appel, alors qu'il était en parfait état de marche.",
    place: undefined,
    sources: []
  },
  {
    url: new URL(UrlUtil.join(rr0Datasource.searchPath, "1/9/7/0/03/index.html#1970-03-07"), rr0Datasource.baseUrl),
    time: new TimeContext(rr0TestUtil.intlOptions, 1970, 3, 7),
    description: "",
    place: undefined,
    sources: []
  }
]
