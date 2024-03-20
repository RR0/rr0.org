import { Place } from "../../../../../../place/Place"
import { kalamazoo } from "../Kalamazoo"
import { KalamazooCityCode } from "../KalamazooCityCode"
import { usaCity } from "../../../UsaCity"

export let galesburg = usaCity(KalamazooCityCode.Galesburg, kalamazoo, Place.fromDMS("42°17′19″N,85°25′05″W"))
