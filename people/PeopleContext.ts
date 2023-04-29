import {KnownPeople} from "./People"

export class PeopleContext {
  /**
   * Known people, by last name, in this context.
   */
  constructor(readonly cache = new Map<string, KnownPeople>()) {
  }

  clone(): PeopleContext {
    return new PeopleContext(this.cache)
  }
}
