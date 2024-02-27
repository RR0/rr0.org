import { City } from "../../../country/region/department/city/City"
import { kootenaysCities } from "./rdck/KootenaysCities"

export const britishColumbiaCities: { [key: string]: City } = {
  ...kootenaysCities
}
