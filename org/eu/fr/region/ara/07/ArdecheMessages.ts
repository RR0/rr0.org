import { couxMessages } from "./coux/CouxMessages"
import { ArdecheCityCode } from "./ArdecheCityCode"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"
import { largentiereMessages } from "./largentiere/LargentiereMessages"

export const ardecheMessages = DepartmentMessages.create("Ardèche", {
  [ArdecheCityCode.Coux]: couxMessages,
  [ArdecheCityCode.Largentiere]: largentiereMessages
})
