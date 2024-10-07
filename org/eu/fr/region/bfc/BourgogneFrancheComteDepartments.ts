import { saoneEtLoire } from "./71/SaoneEtLoire.js"
import { coteDOr } from "./21/CoteDOr.js"
import { jura } from "./39/Jura.js"
import { Department } from "../../../../country/region/department/Department.js"
import { yonne } from "./89/Yonne.js"
import { nievre } from "./58/Nievre.js"
import { morbihan } from "./56/Morbihan.js"
import { doubs } from "./25/Doubs.js"

export const bourgogneFrancheComteDepartments: Department[] = [
  coteDOr,
  doubs,
  jura,
  morbihan,
  nievre,
  saoneEtLoire,
  yonne
]
