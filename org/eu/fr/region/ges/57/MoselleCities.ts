import { arsSurMoselle } from "./ArsSurMoselle/ArsSurMoselle"
import { City } from "../../../../../country/region/department/city/City"
import { forbach } from "./Forbach/Forbach"
import { montignyLesMetz } from "./MontignyLesMetz/MontignyLesMetz"
import { bouzonville } from "./Bouzonville/Bouzonville"

export const moselleCities: City[] = [
  arsSurMoselle,
  bouzonville,
  forbach,
  montignyLesMetz
]
