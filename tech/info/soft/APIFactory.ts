import { API } from "./API.js"
import { RR0Data } from "../../../data/RR0Data.js"
import { TypedDataFactory } from "../../../data/TypedDataFactory.js"
import { RR0EventFactory } from "../../../event/RR0EventFactory.js"

export class APIFactory extends TypedDataFactory<API> {

  constructor(eventFactory: RR0EventFactory) {
    super(eventFactory, "api", ["index"])
  }

  createFromData(data: RR0Data): API {
    const api: API = {type: "api", id: data.id, dirName: data.dirName, url: data.url, events: data.events || []}
    Object.assign(api, data)
    return api
  }
}
