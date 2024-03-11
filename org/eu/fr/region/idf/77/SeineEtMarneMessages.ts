import { SeineEtMarneCityCode } from "./SeineEtMarneCityCode"
import { sivryCourtryMessages } from "./paris/SivryCourtryMessages"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"
import { CityMessages } from "../../../../../country/region/department/city/CityMessages"

const seineEtMarneCityMessages: { [key in SeineEtMarneCityCode]: CityMessages } = {
  [SeineEtMarneCityCode.SivryCourtry]: sivryCourtryMessages
}
export const seineEtMarneMessages = DepartmentMessages.create("Seine-et-Marne", seineEtMarneCityMessages)
