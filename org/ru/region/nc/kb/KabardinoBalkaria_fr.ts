import { KabardinoBalkariaCityCode } from "./KabardinoBalkariaCityCode.js"
import { elbrusMessages_fr } from "./elbrus/ElbrusMessages_fr.js"
import { DepartmentMessages } from "../../../../country/region/department/DepartmentMessages.js"
import { KabardinoBalkariaCityMessagesList } from "./KabardinoBalkariaMessages.js"

const kabardinoBalkariaCityMessages: KabardinoBalkariaCityMessagesList = {
  [KabardinoBalkariaCityCode.Elbrus]: elbrusMessages_fr
}
export const kabardinoBalkaria_fr = DepartmentMessages.create<KabardinoBalkariaCityMessagesList>(
  "Kabardino-Balkarie", kabardinoBalkariaCityMessages)
