import { Rr0Data } from "../Rr0Data"
import { SsgContext } from "ssg-api"
import { Place } from "../place/Place"
import path from "path"
import { RR0SsgContext } from "../RR0SsgContext"
import { RegionMessagesOptions } from "./country/region/RegionMessages"

export abstract class Organization<M> implements Rr0Data {

  readonly dirName: string

  protected constructor(readonly places: Place[], dirName: string) {
    this.dirName = path.join(orgDirName, dirName)
  }

  abstract messages(context: RR0SsgContext): M

  abstract title(context: SsgContext, options?: RegionMessagesOptions): string
}

export const orgDirName = "org/"
