import { City } from "../../country/region/department/city/City"
import { britishColumbiaCities } from "./bc/BritishColumbiaCities"

export const canadaCities: { [key: string]: City } = {
  ...britishColumbiaCities
}
