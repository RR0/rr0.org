import { RR0Data } from "../../../RR0Data"

export class API extends RR0Data {

  constructor(
    id?: string,
    dirName?: string,
    url?: URL,
    events: RR0Data[] = []
  ) {
    super(id, dirName, url, events, "api")
  }
}
