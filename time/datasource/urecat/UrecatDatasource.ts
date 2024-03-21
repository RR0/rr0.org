import { UrecatCase } from "./UrecatCase"
import { CaseSource } from "../CaseSource"
import { RR0SsgContext } from "../../../RR0SsgContext"

export abstract class UrecatDatasource implements CaseSource<UrecatCase> {
  readonly authors = ["Gross, Patrick"]
  readonly copyright = "URECAT (Les ovnis vus de près)"

  abstract fetch(context: RR0SsgContext): Promise<UrecatCase[]>
}
