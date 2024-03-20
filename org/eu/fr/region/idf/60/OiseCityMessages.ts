import { OiseCityCode } from "./OiseCityCode"
import { pontLEveque60Messages } from "./PontLEveque/PontLEvequeMessages"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"
import { CityMessages } from "../../../../../country/region/department/city/CityMessages"
import { compiegneMessages } from "./compiegne/CompiegneMessages"
import { neuillyEnThelleMessages } from "./NeuillyEnThelle/NeuillyEnThelleMessages"
import { ribecourtDreslincourtMessages } from "./RibecourtDreslincourt/RibecourtDreslincourtMessages"
import { morlincourtMessages } from "./morlincourt/MorlincourtMessages"
import { pontSainteMaxenceMessages } from "./PontSainteMaxence/PontSainteMaxenceMessages"

const oiseCityMessages: { [key in OiseCityCode]: CityMessages } = {
  [OiseCityCode.Compiegne]: compiegneMessages,
  [OiseCityCode.Morlincourt]: morlincourtMessages,
  [OiseCityCode.NeuillyEnThelle]: neuillyEnThelleMessages,
  [OiseCityCode.PontLEveque]: pontLEveque60Messages,
  [OiseCityCode.PontSainteMaxence]: pontSainteMaxenceMessages,
  [OiseCityCode.RibecourtDreslincourt]: ribecourtDreslincourtMessages
}
export const oiseMessages = DepartmentMessages.create("Oise", oiseCityMessages)
