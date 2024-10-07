import { OiseCityCode } from "./OiseCityCode.js"
import { pontLEveque60Messages } from "./PontLEveque/PontLEvequeMessages.js"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages.js"
import { CityMessages } from "../../../../../country/region/department/city/CityMessages.js"
import { compiegneMessages } from "./compiegne/CompiegneMessages.js"
import { neuillyEnThelleMessages } from "./NeuillyEnThelle/NeuillyEnThelleMessages.js"
import { ribecourtDreslincourtMessages } from "./RibecourtDreslincourt/RibecourtDreslincourtMessages.js"
import { morlincourtMessages } from "./morlincourt/MorlincourtMessages.js"
import { pontSainteMaxenceMessages } from "./PontSainteMaxence/PontSainteMaxenceMessages.js"

const oiseCityMessages: { [key in OiseCityCode]: CityMessages } = {
  [OiseCityCode.Compiegne]: compiegneMessages,
  [OiseCityCode.Morlincourt]: morlincourtMessages,
  [OiseCityCode.NeuillyEnThelle]: neuillyEnThelleMessages,
  [OiseCityCode.PontLEveque]: pontLEveque60Messages,
  [OiseCityCode.PontSainteMaxence]: pontSainteMaxenceMessages,
  [OiseCityCode.RibecourtDreslincourt]: ribecourtDreslincourtMessages
}
export const oiseMessages = DepartmentMessages.create("Oise", oiseCityMessages)
