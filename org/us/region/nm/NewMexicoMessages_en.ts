import { DepartmentMessages } from "../../../country/region/department/city/DepartmentMessages"
import { RegionMessages } from "../../../country/region/RegionMessages"

export const newMexicoMessages_en = new RegionMessages(
  "New Mexico",
  {
    chaves: {
      title: "Chaves County",
      city: {
        88201: new DepartmentMessages("Roswell"),
        88202: new DepartmentMessages("Roswell"),
        88203: new DepartmentMessages("Roswell")
      }
    }
  }
)
