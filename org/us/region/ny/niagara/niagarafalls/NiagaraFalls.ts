import { Place } from "../../../../../../place/Place"
import { niagara } from "../Niagara"
import { NiagaraCityCode } from "../NiagaraCityCode"
import { usaCity } from "../../../UsaCity"

export let niagaraFalls = usaCity(NiagaraCityCode.NiagaraFalls, niagara, Place.fromDMS(`43°6′N,79°1′W`))
