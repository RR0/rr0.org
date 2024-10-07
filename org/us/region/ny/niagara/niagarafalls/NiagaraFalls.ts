import { Place } from "../../../../../../place/Place.js"
import { niagara } from "../Niagara.js"
import { NiagaraCityCode } from "../NiagaraCityCode.js"
import { usaCity } from "../../../UsaCity.js"

export let niagaraFalls = usaCity(NiagaraCityCode.NiagaraFalls, niagara, Place.fromDMS(`43°6′N,79°1′W`))
