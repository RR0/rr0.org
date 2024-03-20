import { RegionMessages } from "../../../../country/region/RegionMessages"
import { CollectiviteOutreMerDepartementCode } from "./CollectiviteOutreMerDepartementCode"
import { DepartmentMessages } from "../../../../country/region/department/DepartmentMessages"
import { nouvelleCaledonie_fr } from "./988/NouvelleCaledonie_fr"

const collectiviteOutreMerCityMessages: { [key in CollectiviteOutreMerDepartementCode]: DepartmentMessages<any> } = {
  [CollectiviteOutreMerDepartementCode.NouvelleCaledonie]: nouvelleCaledonie_fr
}
export const collectiviteOutreMerMessage_fr = RegionMessages.create<{ [key in CollectiviteOutreMerDepartementCode]: DepartmentMessages<any> }>(
  "Collectivité d'outre-mer", collectiviteOutreMerCityMessages
)
