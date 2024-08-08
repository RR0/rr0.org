import { Article } from "./Article"
import { RR0Data } from "../RR0Data"
import { DefaultDataFactory } from "../DefaultDataFactory"

export class ArticleFactory extends DefaultDataFactory<Article> {

  constructor() {
    super("article")
  }

  createFromData(data: RR0Data): T {
    const api = new Article(data.id, dirName, data.url, data.events)
    Object.assign(api, data)
    return api
  }
}
