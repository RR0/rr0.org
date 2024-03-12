import { RussiaDepartementCode } from "../../RussiaDepartementCode"
import { northCaucasus } from "../NorthCaucasus"
import { Place } from "../../../../../place/Place"
import { russiaDepartment } from "../../RussiaDepartment"

export const kabardinoBalkaria = russiaDepartment(RussiaDepartementCode.KabardinoBalkaria, northCaucasus,
  Place.fromDMS("47°20′N,1°40′O"))
