import { Place } from "../../../../../../place/Place.js"
import { FayetteCityCode } from "../FayetteCityCode.js"
import { fayette } from "../Fayette.js"

import { usaCity } from "../../../UsaCity.js"

export let mountHope = usaCity(FayetteCityCode.MountHope, fayette, Place.fromDMS("37°53′33″N,81°10′4″W"))
