import { Place } from "../../../../../../place/Place"
import { usaCity } from "../../../UsaCities"
import { niagara } from "../Niagara"
import { NiagaraCityCode } from "../NiagaraCityCode"

export let niagaraFalls = usaCity(NiagaraCityCode.NiagaraFalls, niagara, Place.fromDMS(`43°6′N,79°1′W`))
