import { NwpCityCode } from "./NwpCityCode"
import { OrganizationMessages } from "../../../../../OrganizationMessages"
import { parkanoMessages } from "./parkano/ParkanoMessages"

type NwpCityMessagesList = { [key in NwpCityCode]: OrganizationMessages }
export const nwpCityMessages: NwpCityMessagesList = {
  [NwpCityCode.Parkano]: parkanoMessages
}
