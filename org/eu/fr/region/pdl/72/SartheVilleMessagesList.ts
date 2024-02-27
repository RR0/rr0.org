import { SartheVilleCode } from "../../idf/IdfDepartementMessages_fr"
import { CityMessages } from "../../../../../country/region/department/city/CityMessages"

export type SartheVilleMessagesList = {
  [key in SartheVilleCode]: CityMessages
}
