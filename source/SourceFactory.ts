import { HtmlRR0SsgContext } from "../RR0SsgContext"
import { Publication, Source } from "./Source"
import path from "path"
import { TimeContext } from "../time/TimeContext"
import { OnlineSource } from "./OnlineSource"
import { FileContents } from "ssg-api"
import { JSDOM } from "jsdom"
import { DataService } from "../DataService"
import { HttpSource } from "../time/datasource/HttpSource"

export class SourceFactory {

  constructor(protected dataService: DataService, protected http: HttpSource, protected baseUrl: string) {
  }

  async create(context: HtmlRR0SsgContext, href: string): Promise<Source> {
    return href.startsWith("http") ? await this.createExternal(context, href) : await this.createInternal(context, href)
  }

  async createInternal(context: HtmlRR0SsgContext, href: string): Promise<Source> {
    if (path.dirname(href).startsWith("/")) {
      href = href.substring(1)
    }
    const hashPos = href.lastIndexOf("#")
    let hash: string
    if (hashPos > 0) {
      hash = href.substring(hashPos + 1)
      href = href.substring(0, hashPos)
    } else {
      hash = undefined
    }
    const ext = path.extname(href)
    let source: Source
    const sourceTypes = ["article", "book", "website",
      undefined   // TODO: Remove undefined when type is set in all .json files
    ]
    switch (ext) {
      case ".htm":
      case ".html":
        source = this.fromPage(href, hash)
        break
      case ".json":
        const sources = await this.dataService.get(path.dirname(href), sourceTypes, [path.basename(href)])
        source = sources?.[0]
        break
      default: {
        const sources = await this.dataService.get(ext ? path.dirname(href) : href, sourceTypes,
          ["index.json", "people.json"])
        source = sources?.[0]
        if (!source) {
          source = this.fromPage(path.join(href, "index.html"), hash)
        }
      }
    }
    const publication = source.publication
    if (publication && !publication.time) {
      publication.time = TimeContext.fromFileName(context, href)
    }
    if (hash) {
      source.index = hash
    }
    return source as Source
  }

  async createExternal(context: HtmlRR0SsgContext, href: string): Promise<Source> {
    const resOut: Partial<Response> = {}
    let title: string
    let lastModif: string
    let publisher: string
    try {
      const doc = await this.http.get(new URL(href), {}, resOut)
      href = resOut.url || href
      title = doc.querySelector("title").textContent
      lastModif = resOut.headers.get("last-modified")
    } catch (e) {
      context.error("Could not fetch source from " + href, e.message)
      title = href
    }
    publisher = resOut.headers.get("host")
    const url = new URL(href)
    const time = lastModif ? TimeContext.fromDate(new Date(lastModif), context.time.options) : context.time
    const publication: Publication = {publisher, time}
    return {title, url, publication}
  }

  protected fromPage(href: string, hash = ""): OnlineSource {
    const filePath = path.extname(href) ? href : path.join(href, "index.html")
    const fileContents = FileContents.read(filePath)
    const doc = new JSDOM(fileContents.contents).window.document.documentElement
    const url = new URL(href, this.baseUrl)
    if (hash) {
      url.hash = hash
    }
    return {
      title: doc.querySelector("title").textContent,
      authors: Array.from(doc.querySelectorAll("meta[name='author']")).map(meta => meta.getAttribute("content")),
      publication: {publisher: doc.querySelector("meta[name='copyright']")?.getAttribute("content")},
      url
    } as OnlineSource
  }
}
