import { Place } from "../../../../../../place/Place.js"
import { kalamazoo } from "../Kalamazoo.js"
import { KalamazooCityCode } from "../KalamazooCityCode.js"
import { usaCity } from "../../../UsaCity.js"

export let galesburg = usaCity(KalamazooCityCode.Galesburg, kalamazoo, Place.fromDMS("42°17′19″N,85°25′05″W"))
