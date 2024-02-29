import { Rr0Data } from "../Rr0Data"
import { SsgContext } from "ssg-api"
import { Place } from "../place/Place"
import path from "path"
import { RR0SsgContext } from "../RR0SsgContext"
import { RegionMessagesOptions } from "./country/region/RegionMessages"

export class Organization<M> implements Rr0Data {

  readonly dirName: string

  constructor(readonly code: string, readonly places: Place[], readonly parent?: Organization<any>) {
    this.dirName = path.join(parent?.dirName ?? orgDirName, code)
  }

  abstract messages(context: RR0SsgContext): M

  abstract title(context: SsgContext, options?: RegionMessagesOptions): string
}

export const orgDirName = "org/"
