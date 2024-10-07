import { Place } from "../../../../../../place/Place.js"
import { dane } from "../Dane.js"
import { DaneCityCode } from "../DaneCityCode.js"
import { usaCity } from "../../../UsaCity.js"

export let madison = usaCity(DaneCityCode.madison, dane, Place.fromDMS("43°04′29″N 89°23′03″W"))
