import { Place } from "../../../../../place/Place"
import { NewYorkCountyCode } from "../NewYorkCountyCode"
import { Department } from "../../../../country/region/department/Department"
import { newYork } from "../NewYork"

export const niagara = Department.create(NewYorkCountyCode.Niagara, newYork, Place.fromDMS("43°19′N,78°47′W"))
