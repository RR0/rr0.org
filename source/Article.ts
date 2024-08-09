import { RR0Data } from "../RR0Data"

export class Article extends RR0Data {

  constructor(
    id?: string,
    dirName?: string,
    url?: string,
    events: RR0Data[] = []
  ) {
    super(id, dirName, url, events, "article")
  }
}
