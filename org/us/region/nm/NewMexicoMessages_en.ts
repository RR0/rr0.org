import { RegionMessages } from "../../../country/region/RegionMessages"
import { OrganizationMessages } from "../../../OrganizationMessages"

export const newMexicoMessages_en = RegionMessages.create(
  "New Mexico",
  {
    chaves: {
      title: "Chaves County",
      city: {
        88201: new OrganizationMessages("Roswell"),
        88202: new OrganizationMessages("Roswell"),
        88203: new OrganizationMessages("Roswell")
      }
    }
  }
)
