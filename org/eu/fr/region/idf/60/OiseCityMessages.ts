import { OiseCityCode } from "./OiseCityCode"
import { pontLEveque60Messages } from "./pontleveque/PontLEvequeMessages"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"
import { CityMessages } from "../../../../../country/region/department/city/CityMessages"
import { compiegneMessages } from "./compiegne/CompiegneMessages"
import { neuillyEnThelleMessages } from "./neuillyenthelle/NeuillyEnThelleMessages"
import { ribecourtDreslincourtMessages } from "./ribecourtdreslincourt/RibecourtDreslincourtMessages"
import { morlincourtMessages } from "./morlincourt/MorlincourtMessages"

const oiseCityMessages: { [key in OiseCityCode]: CityMessages } = {
  [OiseCityCode.Compiegne]: compiegneMessages,
  [OiseCityCode.Morlincourt]: morlincourtMessages,
  [OiseCityCode.NeuillyEnThelle]: neuillyEnThelleMessages,
  [OiseCityCode.PontLEveque]: pontLEveque60Messages,
  [OiseCityCode.RibecourtDreslincourt]: ribecourtDreslincourtMessages
}
export const oiseMessages = DepartmentMessages.create("Oise", oiseCityMessages)
