import { TypedDataFactory } from "../../../../../data/TypedDataFactory.js"
import { RR0Case } from "./RR0Case.js"
import { RR0EventFactory } from "../../../../../event/RR0EventFactory.js"

export class CaseFactory extends TypedDataFactory<RR0Case> {

  constructor(eventFactory: RR0EventFactory) {
    super(eventFactory, "case")
  }
}
