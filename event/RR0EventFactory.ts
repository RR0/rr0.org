import { RR0Event } from "./RR0Event.js"
import { AbstractDataFactory } from "../data/AbstractDataFactory.js"
import { RR0Data } from "../data/RR0Data.js"

export class RR0EventFactory extends AbstractDataFactory<RR0Event> {

  constructor() {
    super(null)
  }

  createFromData(event: RR0Data): RR0Event {
    event.time = this.createTimeFromString(event.time as any)
    switch (event.type) {
      case "image":
        event.name = event.name || event.parent?.name
        event.title = event.title || event.parent?.title
        break
      default:
        if (typeof event.place === "string") {
          event.place = {name: event.place}
        }
    }
    return event as RR0Event
  }
}
