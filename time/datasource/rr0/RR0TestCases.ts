import { TimeContext } from "../../TimeContext"
import { rr0TestUtil } from "../../../test/RR0TestUtil"
import { rr0Datasource } from "./RR0Mapping"
import { RR0CaseSummary } from "./RR0CaseSummary"
import { UrlUtil } from "../../../util/url/UrlUtil"

export const rr0TestCases: RR0CaseSummary[] = [
  {
    url: new URL(UrlUtil.join(rr0Datasource.searchPath, "1/9/7/0/11"), rr0Datasource.baseUrl),
    time: new TimeContext(rr0TestUtil.intlOptions, 1970, 11, 1),
    description: "",
    place: undefined,
    sources: []
  },
  {
    url: new URL(UrlUtil.join(rr0Datasource.searchPath, "1/9/7/0/11"), rr0Datasource.baseUrl),
    time: new TimeContext(rr0TestUtil.intlOptions, 1970, 11, 2),
    description: "",
    place: undefined,
    sources: []
  }
]
