import { TypedDataFactory } from "../../../../../data/TypedDataFactory"
import { RR0Case } from "./RR0Case"
import { RR0EventFactory } from "../../../../../event/RR0EventFactory"

export class CaseFactory extends TypedDataFactory<RR0Case> {

  constructor(eventFactory: RR0EventFactory) {
    super(eventFactory, "case")
  }
}
