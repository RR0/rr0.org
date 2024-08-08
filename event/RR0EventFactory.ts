import { RR0Event } from "./RR0Event"
import { AbstractDataFactory } from "../AbstractDataFactory"
import { RR0Data } from "../RR0Data"

export class RR0EventFactory extends AbstractDataFactory<RR0Event> {

  constructor() {
    super(null)
  }

  createFromData(event: RR0Data): RR0Event {
    event.time = this.createTimeFromString(event.time)
    switch (event.type) {
      default:
        if (typeof event.place === "string") {
          event.place = {name: event.place}
        }
    }
    return event as RR0Event
  }
}
