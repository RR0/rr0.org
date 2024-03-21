import { couxMessages } from "./Coux/CouxMessages"
import { ArdecheCityCode } from "./ArdecheCityCode"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"
import { largentiereMessages } from "./Largentiere/LargentiereMessages"
import { vernouxEnVivaraisMessages } from "./VernouxEnVivarais/VernouxEnVivaraisMessages"

export const ardecheMessages = DepartmentMessages.create("Ardèche", {
  [ArdecheCityCode.Coux]: couxMessages,
  [ArdecheCityCode.Largentiere]: largentiereMessages,
  [ArdecheCityCode.VernouxEnVivarais]: vernouxEnVivaraisMessages
})
