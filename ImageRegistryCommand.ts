import {DomReplaceCommand, DomReplacer} from "ssg-api"
import {AnchorReplacer} from "./anchor/AnchorReplacer"
import {HtmlRR0SsgContext} from "./RR0SsgContext"
import * as path from "path"
import * as fs from "fs"
import sizeOf from "image-size"

/**
 * Register images  (`<img>` tags) required in an HTML file.
 */
export class ImageRegistryCommand extends DomReplaceCommand<HTMLImageElement> {

  protected readonly singleton: AnchorReplacer

  constructor(protected outDir: string, protected maxWidth: number, protected maxHeight: number) {
    super("img")
  }

  protected async createReplacer(context: HtmlRR0SsgContext): Promise<DomReplacer<HTMLImageElement>> {
    return {
      replace: async (original: HTMLImageElement): Promise<HTMLImageElement> => {
        const src = original.src
        context.debug(context.inputFile.name, "requires image", src)
        try {
          let isExternal = src.startsWith("http")
          let isAbsolute = src.startsWith("/")
          let imgPath = isExternal ? src : isAbsolute ? path.join(".", src) : path.join(
            path.dirname(context.inputFile.name),
            src)
          original.loading = "lazy"
          if (!original.width && !original.height) {
            const dimensions = sizeOf(imgPath)
            let width = dimensions.width
            let height = dimensions.height
            if (width > this.maxWidth) {
              const ratio = this.maxWidth / width
              width = this.maxWidth
              height *= ratio
            }
            if (height > this.maxHeight) {
              const ratio = this.maxHeight / height
              height = this.maxHeight
              width *= ratio
            }
            original.width = width
            original.height = height
          }
        } catch (e) {
          context.debug("Could not determine size of image ", src, e)
        }
        context.images.add(src)
        return original
      }
    }
  }

  protected async postExecute(context: HtmlRR0SsgContext) {
    const imagesUrls = context.images
    if (imagesUrls.size > 0) {
      for (const imageUrl of imagesUrls) {
        this.handleImage(context, imageUrl)
      }
      imagesUrls.clear()
    }
  }

  private handleImage(context: HtmlRR0SsgContext, imageUrl: string) {
    const inputFile = context.inputFile.name
    if (imageUrl) {
      const isLocal = !imageUrl.startsWith("http")
      if (isLocal) {
        const contextDir = path.dirname(inputFile)
        const isAbsolute = path.isAbsolute(imageUrl)
        const inFile = isAbsolute ? path.resolve(imageUrl) : path.resolve(path.join(contextDir, imageUrl))
        const outDir = isAbsolute ? this.outDir : path.join(this.outDir, contextDir)
        const outRel = path.join(outDir, imageUrl)
        context.debug("Copying", imageUrl, "to", outRel)
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
}
