import { monroe_en } from "./monroe/Monroe_en"
import { elkhart_en } from "./elkhart/Elkhart_en"
import { RegionMessages } from "../../../country/region/RegionMessages"

export const indiana_en = RegionMessages.create("Indiana", {
  elkhart: elkhart_en,
  monroe: monroe_en
})
