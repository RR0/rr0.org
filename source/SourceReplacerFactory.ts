import { DomReplacer, ReplacerFactory, SsgFile } from "ssg-api"
import { SourceRenderer } from "../time/SourceRenderer"
import { HtmlRR0SsgContext } from "../RR0SsgContext"
import { DataService } from "../DataService"
import { Publication, Source } from "./Source"
import { HttpSource } from "../time/datasource/HttpSource"
import { TimeReplacer } from "../time/TimeReplacer"
import path from "path"
import { JSDOM } from "jsdom"
import { TimeContext } from "../time/TimeContext"
import { OnlineSource } from "./OnlineSource"

export class SourceReplacer {
  /**
   * Source counter in the scope of the current page/context.
   */
  protected number = 0

  protected readonly pageSource = new Map()

  constructor(protected renderer: SourceRenderer, protected dataService: DataService, protected http: HttpSource,
              protected baseUrl: string) {
  }

  async replacement(context: HtmlRR0SsgContext, original: HTMLElement): Promise<HTMLElement> {
    this.number++
    const sourceStr = this.number.toString()
    const sourceId = `source-${sourceStr}`
    const outputDoc = context.file.document
    const replacement = outputDoc.createElement("span")
    replacement.className = "source-id"
    replacement.ariaLabel = "Source"
    replacement.textContent = "s" + sourceStr
    const contents = outputDoc.createElement("span")
    contents.className = "source-contents"
    await this.content(context, original, contents)
    const anchor = outputDoc.createElement("span")
    anchor.id = sourceId
    anchor.className = "anchor"
    replacement.append(anchor, contents)
    return replacement
  }

  protected async content(context: HtmlRR0SsgContext, original: HTMLElement, contents: HTMLSpanElement) {
    const href = (original as HTMLAnchorElement).href || original.dataset.href
    if (href) {
      await this.sourceFromLink(context, contents, href)
    } else {
      contents.innerHTML = original.innerHTML
    }
  }

  protected async sourceFromLink(context: HtmlRR0SsgContext, container: HTMLElement, href: string) {
    const source = href.startsWith("http") ?
      await this.sourceFromExternalLink(href, context) : await this.fromInternalLink(href, context)
    this.renderer.renderContent(context, source, container)
  }

  protected async fromInternalLink(href: string, context: HtmlRR0SsgContext): Promise<Source> {
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
        source = this.fromPage(context, href)
        break
      case ".json":
        const sources = await this.dataService.get(context, path.dirname(href), sourceTypes, [path.basename(href)])
        source = sources?.[0]
        break
      default: {
        const sources = await this.dataService.get(context, ext ? path.dirname(href) : href, sourceTypes,
          ["index.json", "people.json"])
        source = sources?.[0]
        if (!source) {
          source = this.fromPage(context, path.join(href, "index.html"))
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

  protected fromPage(context: HtmlRR0SsgContext, href: string): OnlineSource {
    const ssgFile = SsgFile.read(context, path.extname(href) ? href : path.join(href, "index.html"))
    const doc = new JSDOM(ssgFile.contents).window.document.documentElement
    return {
      title: doc.querySelector("title").textContent,
      authors: Array.from(doc.querySelectorAll("meta[name='author']")).map(meta => meta.getAttribute("content")),
      publication: {
        publisher: doc.querySelector("meta[name='copyright']")?.getAttribute("content")
      },
      url: new URL(href, this.baseUrl)
    } as OnlineSource
  }

  protected async sourceFromExternalLink(href: string, context: HtmlRR0SsgContext) {
    const resOut: Partial<Response> = {}
    let title: string
    let lastModif: string
    try {
      const doc = await this.http.get(href, {}, resOut)
      title = doc.querySelector("title").textContent
      lastModif = resOut.headers["lastModified"]
    } catch (e) {
      console.error("Could not fetch source from " + href, e.message)
      title = href
      lastModif = new Date().toISOString()
    }
    const sourceContext = context.clone()
    TimeReplacer.updateTimeFromStr(sourceContext.time, lastModif)
    const url = new URL(href)
    const publication: Publication = {
      publisher: url.hostname,
      time: sourceContext.time
    }
    return {title, url, publication}
  }
}

/**
 * Creates replacers for sources HTML in a given context.
 */
export class SourceReplacerFactory implements ReplacerFactory<DomReplacer> {

  constructor(protected renderer: SourceRenderer, readonly dataService: DataService, readonly http: HttpSource,
              protected baseUrl: string) {
  }

  async create(context: HtmlRR0SsgContext): Promise<DomReplacer> {
    const replacer = new SourceReplacer(this.renderer, this.dataService, this.http, this.baseUrl)
    return {
      async replace(original: HTMLElement): Promise<HTMLElement> {
        return replacer.replacement(context, original)
      }
    }
  }
}
