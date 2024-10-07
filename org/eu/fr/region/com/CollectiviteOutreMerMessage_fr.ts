import { RegionMessages } from "../../../../country/region/RegionMessages.js"
import { CollectiviteOutreMerDepartementCode } from "./CollectiviteOutreMerDepartementCode.js"
import { DepartmentMessages } from "../../../../country/region/department/DepartmentMessages.js"
import { nouvelleCaledonie_fr } from "./988/NouvelleCaledonie_fr.js"

const collectiviteOutreMerCityMessages: { [key in CollectiviteOutreMerDepartementCode]: DepartmentMessages<any> } = {
  [CollectiviteOutreMerDepartementCode.NouvelleCaledonie]: nouvelleCaledonie_fr
}
export const collectiviteOutreMerMessage_fr = RegionMessages.create<{ [key in CollectiviteOutreMerDepartementCode]: DepartmentMessages<any> }>(
  "Collectivité d'outre-mer", collectiviteOutreMerCityMessages
)
