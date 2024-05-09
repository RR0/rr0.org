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

  constructor(protected renderer: SourceRenderer, protected dataService: DataService, protected http: HttpSource,
              protected baseUrl: string) {
  }

  async replacement(context: HtmlRR0SsgContext, original: HTMLElement): Promise<HTMLElement> {
    this.number++
    const sourceStr = this.number.toString()
    const sourceId = `source-${sourceStr}`
    const outputDoc = context.outputFile.document
    const replacement = outputDoc.createElement("span")
    replacement.className = "source-id"
    replacement.ariaLabel = "Source"
    replacement.textContent = "s" + sourceStr
    const contents = outputDoc.createElement("span")
    contents.className = "source-contents"
    const href = (original as HTMLAnchorElement).href || original.dataset.href
    if (href) {
      await this.sourceFromLink(context, contents, href)
    } else {
      contents.innerHTML = original.innerHTML
    }
    const anchor = outputDoc.createElement("span")
    anchor.id = sourceId
    anchor.className = "anchor"
    replacement.append(anchor, contents)
    return replacement
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
    const isFile = Boolean(path.extname(href))
    const sources = await this.dataService.get(context, isFile ? path.dirname(href) : href,
      ["article", "book", "website",
        undefined   // TODO: Remove undefined when type is set in all .json files
      ],
      ["index.json", "people.json"])
    let source: Source = sources[0]
    if (!source) {
      source = this.fromPage(context, href)
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
        publisher: doc.querySelector("meta[name='copyright']")?.getAttribute("content"),
        time: TimeContext.fromFileName(context, ssgFile.name)
      },
      url: new URL(href, this.baseUrl)
    } as OnlineSource
  }

  protected async sourceFromExternalLink(href: string, context: HtmlRR0SsgContext) {
    const resOut = {}
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
