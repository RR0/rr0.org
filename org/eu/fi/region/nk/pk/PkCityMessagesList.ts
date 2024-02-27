import { CityMessages } from "../../../../../country/region/department/city/CityMessages"

export enum PkVilleCode {
  Lieksa = 81700
}

export type PkCityMessagesList = {
  [key in PkVilleCode]: CityMessages
}
