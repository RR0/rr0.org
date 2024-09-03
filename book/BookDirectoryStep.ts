import { HtmlRR0SsgContext } from "../RR0SsgContext"
import { DirectoryStep, FileContents, HtmlLinks, HtmlMeta, OutputFunc, SsgConfig } from "ssg-api"
import { RR0FileUtil } from "../util/file/RR0FileUtil"
import { Book } from "./Book"
import { StringUtil } from "../util/string/StringUtil"
import { HtmlTag } from "../util/html/HtmlTag"
import fs from "fs"
import path from "path"
import { Chapter } from "./Chapters"

/**
 * Scan directories for book information, then populates a template with collected data.
 */
export class BookDirectoryStep extends DirectoryStep {

  constructor(rootDirs: string[], templateFileName: string, protected outputFunc: OutputFunc,
              config: SsgConfig, name: string,
              protected bookMeta: Map<string, HtmlMeta>, protected bookLinks: Map<string, HtmlLinks>) {
    super({rootDirs, excludedDirs: [], templateFileName, getOutputPath: config.getOutputPath}, name)
  }

  static async create(outputFunc: OutputFunc, config: SsgConfig, bookMeta: Map<string, HtmlMeta>,
                      bookLinks: Map<string, HtmlLinks>): Promise<BookDirectoryStep> {
    const dirs = RR0FileUtil.findDirectoriesContaining("book*.json")
    return new BookDirectoryStep(dirs, "book/index.html", outputFunc, config, "all books", bookMeta,
      bookLinks)
  }

  protected async processDirs(context: HtmlRR0SsgContext, dirNames: string[]): Promise<void> {
    const books = this.scan(context, dirNames)
    await this.tocAll(context, books)
    const directoriesHtml = this.toList(books)
    context.file.contents = context.file.contents.replace(`<!--#echo var="directories" -->`, directoriesHtml)
    await this.outputFunc(context, context.file)
  }

  protected scan(context: HtmlRR0SsgContext, dirNames: string[]): Book[] {
    const books: Book[] = []
    for (const dirName of dirNames) {
      const dirBook: Book = {
        events: [], previousSourceRefs: [], type: "book",
        dirName,
        authors: [],
        publication: {publisher: "", time: undefined},
        summary: "",
        title: "",
        variants: []
      }
      books.push(dirBook)
      try {
        const jsonFileInfo = FileContents.read(`${dirName}/book.json`)
        Object.assign(dirBook, JSON.parse(jsonFileInfo.contents))
      } catch (e) {
        context.warn(`${dirName} has no book*.json description`)
      }
    }
    return books
  }

  /**
   * Convert an array of Case[] to an <ul> HTML unordered list.
   *
   * @param books
   */
  protected toList(books: Book[]) {
    const listItems = books.map(dirBook => {
      if (!dirBook.title) {
        const lastSlash = dirBook.dirName.lastIndexOf("/")
        const lastDir = dirBook.dirName.substring(lastSlash + 1)
        dirBook.title = StringUtil.camelToText(lastDir)
      }
      return this.toListItem(dirBook)
    })
    return HtmlTag.toString("ul", listItems.join("\n"), {class: "links"})
  }

  /**
   * Convert a Case object to an HTML list item.
   *
   * @param dirBook
   */
  protected toListItem(dirBook: Book) {
    const attrs: { [name: string]: string } = {}
    const titles = []
    const details: string[] = []
    const authors = dirBook.authors
    const authorStr = authors ? authors.join(" & ") + ": " : ""
    const time = dirBook.publication.time
    if (time) {
      const timeDetail = time.getYear()
      details.push(HtmlTag.toString("time", timeDetail.toString()))
    }
    const text: (string | string[])[] = [authorStr, dirBook.title]
    if (details.length > 0) {
      text.push(`(${details.join(", ")})`)
    }
    const innerHTML = text.join(" ").trim()
    const a = fs.existsSync(path.join(dirBook.dirName, "index.html")) ? HtmlTag.toString("a", innerHTML,
      {href: "/" + dirBook.dirName + "/"}) : innerHTML
    if (titles.length) {
      attrs.title = titles.join(", ")
    }
    return HtmlTag.toString("li", a, attrs)
  }

  protected async tocAll(context: HtmlRR0SsgContext, books: Book[]) {
    for (const book of books) {
      await this.toc(context, book)
    }
  }

  protected async toc(context: HtmlRR0SsgContext, book: Book) {
    const startFileName = path.join(book.dirName, "index.html")
    try {
      context.read(startFileName)
      const startFileNames = [context.file.name]
      const variants = context.file.lang.variants
      for (const variant of variants) {
        const parsed = path.parse(startFileName)
        const variantFileName = path.join(parsed.dir, `${parsed.name}_${variant}${parsed.ext}`)
        startFileNames.push(variantFileName)
      }
      for (const startFileName of startFileNames) {
        const chapter = new Chapter(context, startFileName)
        await chapter.scan()
        const chapterBefore = chapter.toString()
        context.logger.debug("toc before:", chapterBefore)
        await chapter.update()
        const chapterAfter = chapter.toString()
        context.logger.debug("toc after:", chapterAfter)
        context.logger.log("Updated toc for", chapter.context.file.name)
        book.variants.push(chapter)
        this.bookMeta.set(startFileName, chapter.context.file.meta)
        this.bookLinks.set(startFileName, chapter.context.file.links)
      }
    } catch (e) {
      context.logger.error("Could not check TOC of " + startFileName, e.message)
    }
  }
}
