import { CityMessages } from "../../../../../country/region/department/city/CityMessages"

export enum CalvadosVilleCode {
  PontLEveque = 14130
}

export type CalvadosVilleMessagesList = {
  [key in CalvadosVilleCode]: CityMessages
}
