import { RR0SsgContext } from "../../../RR0SsgContext"
import { AbstractCaseSource } from "../AbstractCaseSource"
import { UfoSearchCase } from "./UfoSearchCase"

export abstract class UfoSearchDatasource extends AbstractCaseSource<UfoSearchCase> {

  protected constructor(authors = ["Geldreich, Rich"], copyright = "UFO Search") {
    super(authors, copyright)
  }

  protected abstract readCases(context: RR0SsgContext): Promise<UfoSearchCase[]>
}
