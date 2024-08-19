import { BaseOvniFranceCaseSummary } from "./BaseOvniFranceCaseSummary"
import { TimeContext } from "../../TimeContext"
import { rr0TestUtil } from "../../../test/RR0TestUtil"
import { baseOvniFranceDatasource } from "./BaseOvniFranceRR0Mapping"

export const baseOvniFranceTestCases: BaseOvniFranceCaseSummary[] = [
  {
    id: "2760",
    url: new URL("listgen.php?typlist=20&page=0&numobs=2760", baseOvniFranceDatasource.baseUrl).href,
    city: "Le Mans",
    depCode: "72",
    time: new TimeContext(rr0TestUtil.intlOptions, 1970, 3, undefined, 16, 0, "GMT+1"),
    physicalEffect: false,
    witnessEffect: false,
    entities: false,
    landing: false
  },
  {
    id: "1650",
    url: new URL("listgen.php?typlist=20&page=0&numobs=1650", baseOvniFranceDatasource.baseUrl).href,
    city: "Lyon",
    depCode: "69",
    time: new TimeContext(rr0TestUtil.intlOptions, 1970, 3, 12, 7, 40, "GMT+1"),
    physicalEffect: false,
    witnessEffect: false,
    entities: false,
    landing: false
  },
  {
    id: "3088",
    url: new URL("listgen.php?typlist=20&page=0&numobs=3088", baseOvniFranceDatasource.baseUrl).href,
    city: "Briançon",
    depCode: "05",
    time: new TimeContext(rr0TestUtil.intlOptions, 1970, 3, 16, 20, 0, "GMT+1"),
    physicalEffect: false,
    witnessEffect: false,
    entities: false,
    landing: false
  },
  {
    id: "1655",
    url: new URL("listgen.php?typlist=20&page=0&numobs=1655", baseOvniFranceDatasource.baseUrl).href,
    city: "Chambon sur Voueize",
    depCode: "23",
    time: new TimeContext(rr0TestUtil.intlOptions, 1970, 3, 17, 19, 15, "GMT+1"),
    physicalEffect: false,
    witnessEffect: false,
    entities: false,
    landing: false
  }
]
