import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"
import { lyon69Messages } from "./lyon/Lyon69Messages"
import { RhoneCityCode } from "./RhoneCityCode"
import { belleville69Messages } from "./belleville/BellevilleMessages"
import { CityMessages } from "../../../../../country/region/department/city/CityMessages"

export const rhoneCityMessages: RhoneCityMessagesList = {
  [RhoneCityCode.Lyon]: lyon69Messages,
  [RhoneCityCode.Belleville]: belleville69Messages
}

export type RhoneCityMessagesList = { [key in RhoneCityCode]: CityMessages }

export const rhoneMessages = new DepartmentMessages<RhoneCityMessagesList>("Rhône", rhoneCityMessages)
