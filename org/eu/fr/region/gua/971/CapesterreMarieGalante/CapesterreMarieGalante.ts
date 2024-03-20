import { Place } from "../../../../../../../place/Place"
import { GuadeloupeCityCode } from "../GuadeloupeCityCode"
import { City } from "../../../../../../country/region/department/city/City"
import { guadeloupe } from "../Guadeloupe"

export const capesterreMarieGalante = City.create(GuadeloupeCityCode.CapesterreMarieGalante, guadeloupe,
  Place.fromDMS("15°54′00″N,61°13′00″W"))
