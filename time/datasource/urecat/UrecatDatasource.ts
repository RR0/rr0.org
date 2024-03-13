import { UrecatCase } from "./UrecatCase"
import { CaseSource } from "../CaseSource"

export abstract class UrecatDatasource implements CaseSource<UrecatCase> {
  readonly author = "Gross, Patrick"
  readonly copyright = "URECAT (Les ovnis vus de près)"
}
