import { Place } from "../../../../../../place/Place"
import { dane } from "../Dane"
import { DaneCityCode } from "../DaneCityCode"
import { usaCity } from "../../../UsaCity"

export let madison = usaCity(DaneCityCode.madison, dane, Place.fromDMS("43°04′29″N 89°23′03″W"))
