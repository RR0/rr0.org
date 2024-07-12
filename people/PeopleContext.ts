import { KnownPeople } from "./People"

export class PeopleContext {
  /**
   * Known people, by last name, in this context.
   */
  constructor(readonly registry = new Map<string, KnownPeople>()) {
  }

  clone(): PeopleContext {
    return new PeopleContext(this.registry)
  }
}
