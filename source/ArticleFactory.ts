import { Article } from "./Article"
import { RR0Data } from "../data/RR0Data"
import { TypedDataFactory } from "../data/TypedDataFactory"

export class ArticleFactory extends TypedDataFactory<Article> {

  constructor() {
    super(eventFactory, "article", ["index", "article"])
  }

  createFromData(data: RR0Data): Article {
    const api = new Article(data.id, data.dirName, data.url, data.events)
    Object.assign(api, data)
    return api
  }
}
