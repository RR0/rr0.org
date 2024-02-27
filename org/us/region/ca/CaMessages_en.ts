import { CityMessages } from "../../../country/region/department/city/CityMessages"
import { RegionMessages } from "../../../country/region/RegionMessages"
import { DepartmentMessages } from "../../../country/region/department/DepartmentMessages"

export const caMessages_en = new RegionMessages(
  "California",
  {
    sandiego: new DepartmentMessages(
      "San Diego County",
      {
        92058: new CityMessages("Oceanside"),
        "92058_1": new CityMessages("Camp Pendleton")
      }
    )
  }
)
