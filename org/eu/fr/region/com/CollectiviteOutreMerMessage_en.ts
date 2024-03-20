import { RegionMessages } from "../../../../country/region/RegionMessages"
import { CollectiviteOutreMerDepartementCode } from "./CollectiviteOutreMerDepartementCode"
import { DepartmentMessages } from "../../../../country/region/department/DepartmentMessages"
import { nouvelleCaledonie_en } from "./988/NouvelleCaledonie_en"

const collectiviteOutreMerCityMessages: { [key in CollectiviteOutreMerDepartementCode]: DepartmentMessages<any> } = {
  [CollectiviteOutreMerDepartementCode.NouvelleCaledonie]: nouvelleCaledonie_en
}
export const collectiviteOutreMerMessage_en = RegionMessages.create<{ [key in CollectiviteOutreMerDepartementCode]: DepartmentMessages<any> }>(
  "Overseas collectivity", collectiviteOutreMerCityMessages
)
