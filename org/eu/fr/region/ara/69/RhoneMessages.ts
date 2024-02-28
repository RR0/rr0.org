import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"
import { RhoneCityMessagesList } from "./RhoneCityMessagesList"
import { lyon69Messages } from "./lyon/Lyon69Messages"
import { RhoneCityCode } from "./RhoneCityCode"
import { belleville69Messages } from "./belleville/BellevilleMessages"

export const rhoneCityMessages: RhoneCityMessagesList = {
  [RhoneCityCode.Lyon]: lyon69Messages,
  [RhoneCityCode.Belleville]: belleville69Messages
}

export const rhoneMessages = new DepartmentMessages<RhoneCityMessagesList>("Rhône", rhoneCityMessages)
