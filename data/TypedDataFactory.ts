import path from "path"
import { RR0Data } from "./RR0Data"
import { AbstractDataFactory } from "./AbstractDataFactory"
import { FileContents } from "ssg-api"
import { RR0EventFactory } from "../event/RR0EventFactory"

/**
 * A RR0Data factory which can read either <someType>.json files of index.json with a "type": "<someType>" property.
 */
export class TypedDataFactory<T extends RR0Data> extends AbstractDataFactory<T> {

  constructor(eventFactory: RR0EventFactory, readonly type: string, readonly fileNames: string[] = [type]) {
    super(eventFactory)
  }

  create(file: FileContents): T | undefined {
    const data = JSON.parse(file.contents) as RR0Data
    const basename = path.basename(file.name)
    if (!data.type) {
      data.type = basename.substring(0, basename.indexOf(".")).toLowerCase()
    }
    let datum: T | undefined
    if (data.type === this.type) {
      data.dirName = path.dirname(file.name)
      datum = this.createFromData(data)
    }
    return datum
  }
}
