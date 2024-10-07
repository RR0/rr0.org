import { RR0SsgContext } from "../../../RR0SsgContext.js"
import { AbstractDatasource } from "../AbstractDatasource.js"
import { UfoSearchCase } from "./UfoSearchCase.js"

export abstract class UfoSearchDatasource extends AbstractDatasource<UfoSearchCase> {

  protected constructor(authors = ["Geldreich, Rich"], copyright = "UFO Search") {
    super(authors, copyright)
  }

  protected abstract readCases(context: RR0SsgContext): Promise<UfoSearchCase[]>
}
