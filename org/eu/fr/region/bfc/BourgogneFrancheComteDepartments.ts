import { saoneEtLoire } from "./71/SaoneEtLoire"
import { coteDOr } from "./21/CoteDOr"
import { jura } from "./39/Jura"
import { Department } from "../../../../country/region/department/Department"
import { yonne } from "./89/Yonne"
import { nievre } from "./58/Nievre"
import { morbihan } from "./56/Morbihan"

export const bourgogneFrancheComteDepartments: Department[] = [
  coteDOr,
  jura,
  morbihan,
  nievre,
  saoneEtLoire,
  yonne
]
