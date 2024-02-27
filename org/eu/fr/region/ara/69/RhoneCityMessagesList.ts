import { CityMessages } from "../../../../../country/region/department/city/CityMessages"

export enum RhoneCityCode {
  Lyon = 69001
}

export type RhoneCityMessagesList = {
  [key in RhoneCityCode]: CityMessages
}
