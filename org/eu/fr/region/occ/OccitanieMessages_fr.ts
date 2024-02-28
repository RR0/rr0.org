import { occitanieMessageList } from "./OccitanieMessageList"
import { RegionMessages } from "../../../../country/region/RegionMessages"
import { OccitanieDepartmentMessagesList } from "./OccitanieDepartmentMessagesList"

export const occitanieMessages_fr = new RegionMessages<OccitanieDepartmentMessagesList>(
  "Occitanie",
  occitanieMessageList
)
