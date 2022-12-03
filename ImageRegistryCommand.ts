import {DomReplaceCommand, DomReplacer} from "ssg-api"
import {AnchorReplacer} from "./anchor/AnchorReplacer"
import {HtmlRR0SsgContext} from "./RR0SsgContext"
import * as path from "path"
import * as fs from "fs"

/**
 * Register images  (`<img>` tags) required in an HTML file.
 */
export class ImageRegistryCommand extends DomReplaceCommand<HTMLImageElement> {

  protected readonly singleton: AnchorReplacer

  constructor(protected outDir: string) {
    super("img")
  }

  protected async createReplacer(context: HtmlRR0SsgContext): Promise<DomReplacer<HTMLImageElement>> {
    return {
      replace: async (original: HTMLImageElement): Promise<HTMLImageElement> => {
        const src = original.src
        context.debug(context.inputFile.name, "requires image", src)
        context.images.add(src)
        return original
      }
    }
  }

  protected async postExecute(context: HtmlRR0SsgContext) {
    const images = context.images
    if (images.size > 0) {
      const inputFile = context.inputFile.name
      for (const image of images) {
        if (image) {
          const isLocal = !image.startsWith("http")
          if (isLocal) {
            const contextDir = path.dirname(inputFile)
            const isAbsolute = path.isAbsolute(image)
            const inFile = isAbsolute ? path.resolve(image) : path.resolve(path.join(contextDir, image))
            const outDir = isAbsolute ? this.outDir : path.join(this.outDir, contextDir)
            const outRel = path.join(outDir, image)
            context.debug("Copying", image, "to", outRel)
            const outFile = path.resolve(outRel)
            try {
              fs.copyFileSync(inFile, outFile)
            } catch (e) {
              if (e.code === "ENOENT") {
                context.warn(`File ${inFile} does not exist`)
              } else {
                throw e
              }
            }
          }
        } else {
          context.warn(`Empty image src in ${inputFile}`)
        }
      }
      images.clear()
    }
  }
}
