import { Place } from "../../../../../../place/Place"
import { geneva } from "../Geneva"
import { GenevaCityCode } from "../GenevaCityCode"
import { usaCity } from "../../../UsaCities"

export let slocomb = usaCity(GenevaCityCode.Slocomb, geneva, Place.fromLocation(44.896389, 6.635556))
