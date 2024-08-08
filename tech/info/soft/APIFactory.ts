import { API } from "./API"
import { RR0Data } from "../../../RR0Data"
import { DefaultDataFactory } from "../../../DefaultDataFactory"

export class APIFactory extends DefaultDataFactory<API> {

  constructor() {
    super("api")
  }

  createFromData(data: RR0Data): T {
    const api = new API(data.id, dirName, data.url, data.events)
    Object.assign(api, data)
    return api
  }
}
