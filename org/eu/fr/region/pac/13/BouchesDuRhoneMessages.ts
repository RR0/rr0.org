import { eyraguesMessages } from "./eyragues/EyraguesMessages"
import { BouchesDuRhoneCityCode } from "./BouchesDuRhoneCityCode"
import { CityMessages } from "../../../../../country/region/department/city/CityMessages"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"

export type BouchesDuRhoneCityList<T> = { [key in BouchesDuRhoneCityCode]: T }

export const bouchesDuRhoneCityMessages: BouchesDuRhoneCityList<CityMessages> = {
  [BouchesDuRhoneCityCode.Eyragues]: eyraguesMessages
}

export const bouchesDuRhoneMessages = new DepartmentMessages<BouchesDuRhoneCityList<CityMessages>>("Bouches-du-Rhône",
  bouchesDuRhoneCityMessages)
