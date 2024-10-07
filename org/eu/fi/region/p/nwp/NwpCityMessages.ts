import { NwpCityCode } from "./NwpCityCode.js"
import { OrganizationMessages } from "../../../../../OrganizationMessages.js"
import { parkanoMessages } from "./parkano/ParkanoMessages.js"

type NwpCityMessagesList = { [key in NwpCityCode]: OrganizationMessages }
export const nwpCityMessages: NwpCityMessagesList = {
  [NwpCityCode.Parkano]: parkanoMessages
}
