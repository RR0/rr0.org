export class Unit {
  factor: any
  name: any

  constructor(f, n) {
    this.factor = f
    this.name = n
  }

  toString(value) {
    return value > 0 ? value + '&nbsp;' + this.name + (value > 1 ? 's' : '') : ''
  }
}
