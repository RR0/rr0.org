import { CityMessages } from "../../../country/region/department/city/CityMessages"
import { DepartmentMessages } from "../../../country/region/department/DepartmentMessages"
import { RegionMessages } from "../../../country/region/RegionMessages"

export const caMessages_fr = new RegionMessages(
  "Californie",
  {
    sandiego: new DepartmentMessages(
      "Comté de San Diego",
      {
        92058: new CityMessages("Oceanside"),
        "92058_1": new CityMessages("Camp Pendleton")
      }
    )
  }
)
