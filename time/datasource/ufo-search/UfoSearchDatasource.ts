import { RR0SsgContext } from "../../../RR0SsgContext"
import { AbstractDatasource } from "../AbstractDatasource"
import { UfoSearchCase } from "./UfoSearchCase"

export abstract class UfoSearchDatasource extends AbstractDatasource<UfoSearchCase> {

  protected constructor(authors = ["Geldreich, Rich"], copyright = "UFO Search") {
    super(authors, copyright)
  }

  protected abstract readCases(context: RR0SsgContext): Promise<UfoSearchCase[]>
}
