import { Place } from "../../../../../../place/Place.js"
import { geneva } from "../Geneva.js"
import { GenevaCityCode } from "../GenevaCityCode.js"

import { usaCity } from "../../../UsaCity.js"

export let slocomb = usaCity(GenevaCityCode.Slocomb, geneva, Place.fromLocation(44.896389, 6.635556))
