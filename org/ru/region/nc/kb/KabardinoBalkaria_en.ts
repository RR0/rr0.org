import { KabardinoBalkariaCityCode } from "./KabardinoBalkariaCityCode.js"
import { DepartmentMessages } from "../../../../country/region/department/DepartmentMessages.js"
import { KabardinoBalkariaCityMessagesList } from "./KabardinoBalkariaMessages.js"
import { elbrusMessages_en } from "./elbrus/ElbrusMessages_en.js"

const kabardinoBalkariaCityMessages: KabardinoBalkariaCityMessagesList = {
  [KabardinoBalkariaCityCode.Elbrus]: elbrusMessages_en
}
export const kabardinoBalkaria_en = DepartmentMessages.create<KabardinoBalkariaCityMessagesList>(
  "Kabardino-Balkaria", kabardinoBalkariaCityMessages)
