import { Article } from "./Article"
import { RR0Data } from "../data/RR0Data"
import { DefaultDataFactory } from "../data/DefaultDataFactory"

export class ArticleFactory extends DefaultDataFactory<Article> {

  constructor() {
    super("article")
  }

  createFromData(data: RR0Data): Article {
    const api = new Article(data.id, data.dirName, data.url, data.events)
    Object.assign(api, data)
    return api
  }
}
