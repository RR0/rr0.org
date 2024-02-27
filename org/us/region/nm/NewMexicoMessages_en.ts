import { CityMessages } from "../../../country/region/department/city/CityMessages"
import { RegionMessages } from "../../../country/region/RegionMessages"

export const newMexicoMessages_en = new RegionMessages(
  "New Mexico",
  {
    chaves: {
      title: "Chaves County",
      city: {
        88201: new CityMessages("Roswell"),
        88202: new CityMessages("Roswell"),
        88203: new CityMessages("Roswell")
      }
    }
  }
)
