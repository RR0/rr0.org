import { RR0SsgContext } from "../RR0SsgContext"
import assert from "assert"

export type DMS = {
  deg: number
  min: number
  sec: number
  positive: boolean
}

export class PlaceLocation {
  static readonly DMS_PATTERN = /(-?)([0-9]{1,2})°\s*([0-5]?[0-9])[′'](?:\s*([0-5]?[0-9])[″"])?\s*([NS])\s*[, ]\s*(-?)([0-1]?[0-9]{1,2})°\s*([0-5]?[0-9])[′'](?:\s*([0-5]?[0-9])["″])?\s*([EWO])/

  /**
   *
   * @param {float} lat Latitude in decimal degrees. North is positive.
   * @param {float} lng Longitude in decimal degrees. East is positive.
   */
  constructor(readonly lat: number, readonly lng: number) {
  }

  protected static toDouble(m: RegExpExecArray, offset: number): number {
    const sign = "" === m[1 + offset] ? 1 : -1
    const degrees = parseFloat(m[2 + offset])
    const minutes = parseFloat(m[3 + offset]) || 0
    const seconds = parseFloat(m[4 + offset]) || 0
    const direction = "NE".includes(m[5 + offset]) ? 1 : -1
    return sign * direction * (degrees + minutes / 60 + seconds / 3600)
  }

  /**
   *
   * @param dms A string with deg°minutes"seconds'N|S|E|O format
   */
  static fromDMS(dms: string): PlaceLocation {
    const m = PlaceLocation.DMS_PATTERN.exec(dms.trim())
    assert.ok(m, `Malformed degrees/minutes/seconds/direction coordinates in "${dms}"`)
    const latitude = PlaceLocation.toDouble(m, 0)
    const longitude = PlaceLocation.toDouble(m, 5)
    assert.ok(Math.abs(latitude) <= 90, `Invalid latitude ${latitude}`)
    assert.ok(Math.abs(longitude) <= 180, `Invalid longitude ${longitude}`)
    return new PlaceLocation(latitude, longitude)
  }

  static fromDouble(double: number): DMS {
    const positive = double >= 0
    const value = Math.abs(double)
    const deg = Math.trunc(value)
    const minFloat = (value - deg) * 60
    const min = Math.trunc(minFloat)
    const sec = Math.round((minFloat - min) * 60)
    return {deg, min, sec, positive}
  }

  toDMS(context: RR0SsgContext): string {
    const placeMsg = context.messages.place
    return placeMsg.dmsLat(PlaceLocation.fromDouble(this.lat)) + ","
      + placeMsg.dmsLng(PlaceLocation.fromDouble(this.lng))
  }
}
