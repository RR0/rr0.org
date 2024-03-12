import { monroe_fr } from "./monroe/Monroe_fr"
import { RegionMessages } from "../../../country/region/RegionMessages"
import { elkhart_fr } from "./elkhart/Elkhart_fr"
import { IndianaMessages } from "./IndianaMessages"
import { whitley_fr } from "./whitley/Whitley_fr"

export const indiana_fr = RegionMessages.create<IndianaMessages>("Indiana", {
  elkhart: elkhart_fr,
  monroe: monroe_fr,
  whitley: whitley_fr
})
