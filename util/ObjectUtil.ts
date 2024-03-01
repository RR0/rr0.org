import assert from "assert"

export class ObjectUtil {

  static valueFromKey<T>(enu: any, value: string): T {
    const stateEntry = Object.entries(enu).find(entry => entry[1] == value)
    assert.ok(stateEntry, `Could not find value "${value}" in obj ${JSON.stringify(enu)}`)
    const key = stateEntry[0]
    return enu[key] as T
  }
}
