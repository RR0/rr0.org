import { Article } from "./Article.js"
import { RR0Data } from "../data/RR0Data.js"
import { TypedDataFactory } from "../data/TypedDataFactory.js"

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
