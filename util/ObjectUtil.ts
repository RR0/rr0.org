import assert from "assert"

export class ObjectUtil {

  static enumFromValue<T>(enu: any, value: string): T {
    return enu[ObjectUtil.keyFromValue(enu, value)] as T
  }

  static keyFromValue<V>(enu: any, value: V): any {
    const stateEntry = Object.entries(enu).find(entry => entry[1] == value)
    assert.ok(stateEntry, `Could not find value "${value}" in obj ${JSON.stringify(enu)}`)
    return stateEntry[0]
  }
}
