import { RR0Data } from "./RR0Data"
import { TimeContext } from "../time/TimeContext"

import { RR0DataFactory } from "./RR0DataFactory"
import path from "path"
import fs from "fs"
import { RR0Event } from "../event/RR0Event"
import { RR0EventFactory } from "../event/RR0EventFactory"

export class AbstractDataFactory<T extends RR0Data> implements RR0DataFactory<T> {

  static readonly defaultImageFileNames = ["portrait.jpg", "portrait.gif", "portrait.png", "portrait.webp"]

  /**
   * @param eventFactory The factory to create sub-events.
   */
  constructor(protected eventFactory: RR0EventFactory) {
  }

  createTimeFromString(timeStr: string): TimeContext | undefined {
    if (timeStr instanceof TimeContext) {
      return timeStr
    }
    if (timeStr) {
      const time = new TimeContext()
      time.updateFromStr(timeStr)
      return time
    } else {
      return undefined
    }
  }

  createFromData(data: RR0Data): T {
    data.time = this.createTimeFromString(data.time as any)
    const events: RR0Event[] = data.events || []
    const birthTime = (data as any).birthTime as unknown as string
    if (birthTime) {
      delete (data as any).birthTime
      events.push({type: "birth", time: birthTime as any, events: []})
    }
    const deathTime = (data as any).deathTime as unknown as string
    if (deathTime) {
      delete (data as any).deathTime
      events.push({type: "death", time: deathTime as any, events: []})
    }
    if (!data.image) {
      let hasDefaultFile = false
      for (const defaultImageFile of AbstractDataFactory.defaultImageFileNames) {
        hasDefaultFile = fs.existsSync(path.join(data.dirName, defaultImageFile))
        if (hasDefaultFile) {
          events.push({type: "image", url: defaultImageFile as any, name: data.name, events: []})
          break
        }
      }
    }
    data.events = this.parseEvents(events, data)
    return data as T
  }

  protected parseEvents(events: RR0Data[] = [], defaultParent: RR0Data): RR0Event[] {
    const parsed: RR0Event[] = []
    for (const event of events) {
      event.parent = event.parent || defaultParent
      const resolvedEvent = this.eventFactory.createFromData(event)
      parsed.push(resolvedEvent)
    }
    return parsed
  }
}
