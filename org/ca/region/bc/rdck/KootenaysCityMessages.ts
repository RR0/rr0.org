import { castlegarMessages } from "./Castlegar/CastegarMessages.js"
import { CityMessagesList } from "../../../../country/region/department/city/CityMessagesList.js"
import { KootenaysCityCode } from "./KootenaysCityCode.js"

export const kootenaysCityMessages: CityMessagesList = {
  [KootenaysCityCode.Castegar]: castlegarMessages
}
