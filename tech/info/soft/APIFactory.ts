import { DefaultDataFactory } from "../../../DataService"
import { API } from "./API"
import { RR0Data } from "../../../RR0Data"

export class APIFactory extends DefaultDataFactory<API> {

  constructor() {
    super("api")
  }

  protected createFromData(dirName: string, data: RR0Data): API {
    const api = new API(data.id, dirName, data.url, data.events)
    Object.assign(api, data)
    return api
  }
}
