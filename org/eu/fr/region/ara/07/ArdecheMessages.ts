import { couxMessages } from "./Coux/CouxMessages.js"
import { ArdecheCityCode } from "./ArdecheCityCode.js"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages.js"
import { largentiereMessages } from "./Largentiere/LargentiereMessages.js"
import { vernouxEnVivaraisMessages } from "./VernouxEnVivarais/VernouxEnVivaraisMessages.js"

export const ardecheMessages = DepartmentMessages.create("Ardèche", {
  [ArdecheCityCode.Coux]: couxMessages,
  [ArdecheCityCode.Largentiere]: largentiereMessages,
  [ArdecheCityCode.VernouxEnVivarais]: vernouxEnVivaraisMessages
})
