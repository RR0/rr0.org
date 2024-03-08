import { couxMessages } from "./coux/CouxMessages"
import { ArdecheCityCode } from "./ArdecheCityCode"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"

export const ardecheMessages = DepartmentMessages.create("Ardèche", {[ArdecheCityCode.Coux]: couxMessages})
