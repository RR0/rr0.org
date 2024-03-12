import { KabardinoBalkariaCityCode } from "./KabardinoBalkariaCityCode"
import { DepartmentMessages } from "../../../../country/region/department/DepartmentMessages"
import { KabardinoBalkariaCityMessagesList } from "./KabardinoBalkariaMessages"
import { elbrusMessages_en } from "./elbrus/ElbrusMessages_en"

const kabardinoBalkariaCityMessages: KabardinoBalkariaCityMessagesList = {
  [KabardinoBalkariaCityCode.Elbrus]: elbrusMessages_en
}
export const kabardinoBalkaria_en = DepartmentMessages.create<KabardinoBalkariaCityMessagesList>(
  "Kabardino-Balkaria", kabardinoBalkariaCityMessages)
