import path from "path"
import { ClassDomReplaceCommand, ContentStep, HtmlFileContents, Ssg, SsgContextImpl } from "ssg-api"
import { FileContents } from "@javarome/fileutil"
import fs from "fs"

/**
 * @typedef MediumImportOptions
 * @property {string} outDir
 * @property {string} outputFunc
 * @property {string} contentRoots
 */

/**
 * @implements DomReplacement
 */
export class ParagraphReplacer {
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
}

/**
 * @implements ReplacerFactory
 */
class ParagraphReplacerFactory {

  singleton

  async create(context) {
    const instance = await this.getInstance()
    return {
      replace: (original) => instance.replacement(context, original)
    }
  }

  async getInstance() {
    if (!this.singleton) {
      this.singleton = new ParagraphReplacer()
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
    const outDir = options.outDir
    const config = {
      getOutputPath(context) {
        return path.join(outDir, context.file.name)
      }
    }
    this.ssg = new Ssg(config)
  }

  async start(file) {
    const getOutputPath = (context) => path.join(options.outDir, context.file.name)
    /** @type ContentStepConfig */
    const contentConfigs = [{
      roots: [file],
      replacements: [
        new ClassDomReplaceCommand(new ParagraphReplacerFactory(), "pw-post-body-paragraph")
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
    if (!fs.existsSync(fetched)) {
      const fileRes = await fetch(toFetch)
      const fileTxt = await fileRes.text()
      const file = new FileContents(fetched, "utf-8", fileTxt)
      await file.write()
    }
    const converted = await this.start(fetched)
    return { fetched, converted }
  }
}

/**
 * @type {MediumImportOptions}
 */
const options = {
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
  }
}

new MediumImport(options)
  .fetch("https://kalkorff.medium.com/arts-parts-was-first-exposed-in-1996-in-this-book-get-over-it-4bad11fefdf6")
  .then(({ fetched, converted }) => {
    console.log("Imported", fetched, "and converted it to", converted.content.processedFiles[0])
  })
