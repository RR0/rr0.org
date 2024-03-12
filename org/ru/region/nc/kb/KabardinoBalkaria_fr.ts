import { KabardinoBalkariaCityCode } from "./KabardinoBalkariaCityCode"
import { elbrusMessages_fr } from "./elbrus/ElbrusMessages_fr"
import { DepartmentMessages } from "../../../../country/region/department/DepartmentMessages"
import { KabardinoBalkariaCityMessagesList } from "./KabardinoBalkariaMessages"

const kabardinoBalkariaCityMessages: KabardinoBalkariaCityMessagesList = {
  [KabardinoBalkariaCityCode.Elbrus]: elbrusMessages_fr
}
export const kabardinoBalkaria_fr = DepartmentMessages.create<KabardinoBalkariaCityMessagesList>(
  "Kabardino-Balkarie", kabardinoBalkariaCityMessages)
