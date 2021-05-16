import {Unit} from "./Unit"

export class Duration {
  durationInSeconds: number
  second: Unit
  minute: Unit
  hour: Unit
  day: Unit
  unit: Unit

  constructor() {
    this.second = new Unit(1, 'seconde')
    this.minute = new Unit(60 * this.second.factor, 'minute')
    this.hour = new Unit(60 * this.minute.factor, 'heure')
    this.day = new Unit(24 * this.hour.factor, 'jour')
  }

  fromString(txt: string): Duration {
    const durationRegex = /P(\d+D)*(\d+H)*(\d+M)*(\d+S)*/
    const foundExprs = durationRegex.exec(txt)
    this.durationInSeconds = 0
    for (let i = 1; i < foundExprs.length; i++) {
      const expr = foundExprs[i]
      if (expr) {
        const lastCharPos = expr.length - 1
        const value = parseInt(expr.substring(0, lastCharPos), 10)
        switch (expr.charAt(lastCharPos)) {
          case 'D':
            this.unit = this.day
            break
          case 'H':
            this.unit = this.hour
            break
          case 'M':
            this.unit = this.minute
            break
          case 'S':
            this.unit = this.second
            break
          case 'P':
        }
        this.durationInSeconds += value * this.unit.factor
      }
    }
    return this
  }

  toString(unitStated?: Duration): string {
    const txt = []
    let remaining = this.durationInSeconds
    const days = Math.floor(remaining / this.day.factor)
    if (days >= 1) {
      txt.push(unitStated !== this.day.name ? this.day.toString(days) : days)
    }
    remaining = remaining % this.day.factor
    const hours = Math.floor(remaining / this.hour.factor)
    if (hours >= 1) {
      txt.push(unitStated !== this.hour.name ? this.hour.toString(hours) : hours)
    }
    remaining = remaining % this.hour.factor
    const minutes = Math.floor(remaining / this.minute.factor)
    if (minutes >= 1) {
      txt.push(unitStated !== this.minute.name ? this.minute.toString(minutes) : minutes)
    }
    remaining = remaining % this.minute.factor
    const seconds = remaining
    if (seconds >= 1) {
      txt.push(unitStated !== this.second.name ? this.second.toString(seconds) : seconds)
    }
    const last = txt.length - 1
    let s = ''
    for (let i = last; i >= 0; i--) {
      s = (i === last && i > 0 ? ' et ' : i > 0 ? ', ' : '') + txt[i] + s
    }
    return s
  }
}
