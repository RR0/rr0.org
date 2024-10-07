import { vaucouleurs } from "./Vaucouleurs/Vaucouleurs.js"
import { City } from "../../../../../country/region/department/city/City.js"
import { voidVacon } from "./VoidVacon/VoidVacon.js"
import { gondrecourtLeChateau } from "./GondrecourtLeChateau/GondrecourtLeChateau.js"

export const meuseCities: City[] = [
  gondrecourtLeChateau,
  vaucouleurs,
  voidVacon
]
