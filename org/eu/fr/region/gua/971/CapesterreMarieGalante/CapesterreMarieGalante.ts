import { Place } from "../../../../../../../place/Place.js"
import { GuadeloupeCityCode } from "../GuadeloupeCityCode.js"
import { City } from "../../../../../../country/region/department/city/City.js"
import { guadeloupe } from "../Guadeloupe.js"

export const capesterreMarieGalante = City.create(GuadeloupeCityCode.CapesterreMarieGalante, guadeloupe,
  Place.fromDMS("15°54′00″N,61°13′00″W"))
