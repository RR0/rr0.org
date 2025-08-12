import path from "path"
import { ClassDomReplaceCommand, ContentStep, DomReplaceCommand, HtmlFileContents, Ssg, SsgContextImpl } from "ssg-api"
import { Level2Date as EdtfDate } from "@rr0/time"
import { TimeUrlBuilder } from "@rr0/cms"
import { getRR0Options } from "../RR0Options.js"

/**
 * @typedef MediumImportOptions
 * @property {string} outDir
 * @property {string} outputFunc
 * @property {string} contentRoots
 * @property {{RR0Options}} rr0Options
 */

/**
 * @implements ReplacerFactory
 */
class RemoveClassIdReplacerFactory {

  async create(context) {
    const instance = await this.getInstance()
    return {
      replace: (original) => instance.replacement(context, original)
    }
  }

  async getInstance() {
    if (!this.singleton) {
      /**
       * @implements DomReplacement
       */
      this.singleton = new class {
        /**
         *
         * @param {HtmlSsgContext} context
         * @param {HTMLElement} element
         * @return {Promise<E>}
         */
        async replacement(context, element) {
          element.removeAttribute("class")
          element.removeAttribute("id")
          if (element.nextSibling?.nodeType !== 3) {
            element.insertAdjacentText("afterend", "\n")
          }
          return element
        }
      }()
    }
    return this.singleton
  }
}

/**
 * @implements ReplacerFactory
 */
class FigureReplacerFactory {

  async create(context) {
    const instance = await this.getInstance()
    return {
      replace: (original) => instance.replacement(context, original)
    }
  }

  async getInstance() {
    if (!this.singleton) {
      /**
       * @implements DomReplacement
       */
      this.singleton = new class {
        /**
         *
         * @param {HtmlSsgContext} context
         * @param {HTMLElement} element
         * @return {Promise<E>}
         */
        async replacement(context, element) {
          element.remove()
          return null
        }
      }()
    }
    return this.singleton
  }
}

/**
 * @implements ReplacerFactory
 */
class RemoveReplacerFactory {

  async create(context) {
    const instance = await this.getInstance()
    return {
      replace: (original) => instance.replacement(context, original)
    }
  }

  async getInstance() {
    if (!this.singleton) {
      /**
       * @implements DomReplacement
       */
      this.singleton = new class {
        /**
         *
         * @param {HtmlSsgContext} context
         * @param {HTMLElement} element
         * @return {Promise<E>}
         */
        async replacement(context, element) {
          element.remove()
          return null
        }
      }()
    }
    return this.singleton
  }
}

/**
 * Fetch and convert a Medium article to RR0 format.
 */
export class MediumImport {
  /**
   *
   * @param {MediumImportOptions} options
   * @return {string}
   */
  constructor(options) {
    this.options = options
    const rr0Options = options.rr0Options
    const timeOptions = rr0Options.dataOptions.time
    this.timeUrlBuilder = new TimeUrlBuilder(timeOptions)
    const outDir = options.outDir
    const config = {
      getOutputPath(context) {
        return path.join(outDir, context.file.name)
      }
    }
    this.ssg = new Ssg(config)
  }

  /**
   *
   * @param {HtmlFileContents} file
   * @return {Promise<SsgResult>}
   */
  async start(file) {
    const options = this.options
    const getOutputPath = (context) => path.join(options.outDir, context.file.name)
    const doc = file.document
    const h1 = doc.querySelector(".pw-post-title")
    h1.parentElement.remove()
    const author = doc.querySelector("meta[name='author']").content
    const time = EdtfDate.fromString(doc.querySelector("meta[property='article:published_time']").content)
    const timeUrl = this.timeUrlBuilder.fromEdtf(time)
    const titleStr = doc.querySelector("title").textContent
    const url = doc.querySelector("meta[property='og:url']").textContent
    const sep = titleStr.indexOf(" |")
    const title = titleStr.substring(0, sep)
    file.contents = `<!--#include virtual="/header-start.html" -->
<title>${title}</title>
<meta name="author" content="${author}">
<meta name="url" content="${url}">
<!--#include virtual="/header-end.html" -->
${file.contents}
<!--#include virtual="/footer.html" -->`

    await file.write()
    const removeReplacerFactory = new RemoveReplacerFactory()
    const removeClassIdReplacerFactory = new RemoveClassIdReplacerFactory()
    /** @type ContentStepConfig */
    const contentConfigs = [{
      roots: [file.name],
      replacements: [
        new DomReplaceCommand("style", removeReplacerFactory),
        new DomReplaceCommand("link", removeReplacerFactory),
        new DomReplaceCommand("meta", removeReplacerFactory),
        new DomReplaceCommand("script", removeReplacerFactory),
        new ClassDomReplaceCommand(removeClassIdReplacerFactory, "pw-post-body-paragraph"),
        new ClassDomReplaceCommand(removeReplacerFactory, "qd"),
        new DomReplaceCommand("figure", removeClassIdReplacerFactory)
      ],
      getOutputPath
    }]
    const context = new SsgContextImpl()
    return this.ssg
      .add(new ContentStep(contentConfigs, options.outputFunc))
      .start(context)
  }

  async fetch(url, inDir = ".") {
    const toFetch = typeof url === "string" ? new URL(url) : url
    const fileName = toFetch.pathname.substring(0, toFetch.pathname.lastIndexOf("-")) + ".html"
    const fetched = path.join(inDir, fileName)
    /** @type HtmlFileContents */
    let file
    try {
      file = HtmlFileContents.read(fetched)
    } catch (e) {
      const fileRes = await fetch(toFetch)
      const fileTxt = await fileRes.text()
      file = new HtmlFileContents(fetched, "utf-8", fileTxt)
      await file.write()
    }
    const converted = await this.start(file)
    return { fetched, converted }
  }
}

/**
 * @type {MediumImportOptions}
 */
async function getOptions() {
  const rr0Options = await getRR0Options()
  return {
    outDir: path.join(process.cwd(), "./out"),
    outputFunc: async (context, outFile) => {
      try {
        if (context.file instanceof HtmlFileContents) {
          context.file.contents = context.file.serialize()
        }
        context.log("Writing", outFile.name)
        await outFile.write()
        context.file.contents = outFile.contents
      } catch (e) {
        context.error(outFile.name, e)
      }
    },
    rr0Options
  }
}

getOptions()
  .then(async (options) => {
    const importer = new MediumImport(options)
    const {
      fetched,
      converted
    } = await importer.fetch("https://kalkorff.medium.com/arts-parts-was-first-exposed-in-1996-in-this-book-get-over-it-4bad11fefdf6")
    console.log("Imported", fetched, "and converted it to", converted.content.processedFiles[0])
  })
