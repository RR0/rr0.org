import { DomReplaceCommand, DomReplacer } from "ssg-api"
import { HtmlRR0SsgContext } from "./RR0SsgContext.js"
import * as path from "path"
import * as fs from "fs"
import sizeOf from "image-size"

/**
 * Register images (`<img>` tags) required in an HTML file.
 */
export class ImageCommand extends DomReplaceCommand<HTMLImageElement> {

  constructor(protected outBaseDir: string, protected maxWidth: number, protected maxHeight: number,
              protected baseUrl = "") {
    super("img", undefined)
  }

  protected async createReplacer(context: HtmlRR0SsgContext): Promise<DomReplacer<HTMLImageElement>> {
    return {
      replace: async (imgEl: HTMLImageElement): Promise<HTMLImageElement> => {
        const src = imgEl.src
        const imgParentEl = imgEl.parentElement
        if (imgParentEl.tagName === "FIGURE") {
          const captionEl = imgParentEl.querySelector("figcaption")
          if (captionEl) {
            const caption = captionEl.textContent
            if (!imgEl.alt) {
              imgEl.alt = caption.replace(/\n+/g, "").trim()
            }
          } else {
            const caption = imgEl.alt
            if (caption) {
              const newCaptionEl = imgParentEl.ownerDocument.createElement("figcaption")
              newCaptionEl.textContent = caption
              imgParentEl.appendChild(newCaptionEl)
            }
          }
        }
        context.debug(context.file.name, "requires image", src)
        try {
          let isExternal = src.startsWith("http")
          let isAbsolute = src.startsWith("/")
          if (isAbsolute) {
            imgEl.src = this.baseUrl + src
          }
          let imgPath = isExternal ? src : isAbsolute ? path.join(".", src) : path.join(
            path.dirname(context.file.name),
            src)
          imgEl.loading = "lazy"
          if (!isExternal && !imgEl.width && !imgEl.height) {
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
            imgEl.width = width
            imgEl.height = height
            imgEl.setAttribute("onclick",
              `this.classList.contains('zoomed') ? document.exitFullscreen() && this.classList.toggle('zoomed', false): this.classList.toggle('zoomed', true) && this.requestFullscreen()`)
            context.images.add(src)
          }
        } catch (e) {
          context.warn("Could not determine size of image ", src, e)
        }
        return imgEl
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
    const inputFile = context.file.name
    if (imageUrl) {
      const isLocal = !imageUrl.startsWith("http")
      if (isLocal) {
        const contextDir = path.dirname(inputFile)
        const isAbsolute = path.isAbsolute(imageUrl)
        const inFile = isAbsolute ? path.resolve("." + imageUrl) : path.resolve(path.join(contextDir, imageUrl))
        const outBaseDir = isAbsolute ? this.outBaseDir : path.join(this.outBaseDir, contextDir)
        const outRel = path.join(outBaseDir, imageUrl)
        context.debug("Copying", imageUrl, "to", outRel)
        const outFile = path.resolve(outRel)
        try {
          const outDir = path.dirname(outFile)
          if (!fs.existsSync(outDir)) {
            fs.mkdirSync(outDir, {recursive: true})
          }
          fs.copyFileSync(inFile, outFile)
        } catch (e) {
          if (e.code === "ENOENT") {
            context.warn(`File ${inFile} does not exist`)
          } else {
            throw e
          }
        }
      } else {
        context.warn(`File ${imageUrl} is external; will not copy it.`)
      }
    } else {
      context.warn(`Empty image src in ${inputFile}`)
    }
  }
}
