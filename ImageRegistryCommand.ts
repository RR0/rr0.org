import { DomReplaceCommand, DomReplacer } from 'ssg-api';
import { AnchorReplacer } from './anchor/AnchorReplacer';
import { HtmlRR0SsgContext } from './RR0SsgContext';
import * as path from 'path';
import * as fs from 'fs';
import sizeOf from 'image-size';

/**
 * Register images (`<img>` tags) required in an HTML file.
 */
export class ImageRegistryCommand extends DomReplaceCommand<HTMLImageElement> {

  protected readonly singleton: AnchorReplacer;

  constructor(protected outBaseDir: string, protected maxWidth: number, protected maxHeight: number,
              protected baseUrl = '') {
    super('img');
  }

  protected async createReplacer(context: HtmlRR0SsgContext): Promise<DomReplacer<HTMLImageElement>> {
    return {
      replace: async (imgEl: HTMLImageElement): Promise<HTMLImageElement> => {
        const src = imgEl.src;
        const imgParentEl = imgEl.parentElement;
        if (imgParentEl.tagName === 'FIGURE') {
          const captionEl = imgParentEl.querySelector('figcaption');
          if (captionEl) {
            const caption = captionEl.textContent;
            imgEl.alt = caption.replace(/\n+/g, '').trim();
          } else {
            const caption = imgEl.alt;
            if (caption) {
              const newCaptionEl = imgParentEl.ownerDocument.createElement('figcaption');
              newCaptionEl.textContent = caption;
              imgParentEl.appendChild(newCaptionEl);
            }
          }
        }
        context.debug(context.inputFile.name, 'requires image', src);
        try {
          let isExternal = src.startsWith('http');
          let isAbsolute = src.startsWith('/');
          if (isAbsolute) {
            imgEl.src = this.baseUrl + src;
          }
          let imgPath = isExternal ? src : isAbsolute ? path.join('.', src) : path.join(
            path.dirname(context.inputFile.name),
            src);
          imgEl.loading = 'lazy';
          if (!imgEl.width && !imgEl.height) {
            const dimensions = sizeOf(imgPath);
            let width = dimensions.width;
            let height = dimensions.height;
            if (width > this.maxWidth) {
              const ratio = this.maxWidth / width;
              width = this.maxWidth;
              height *= ratio;
            }
            if (height > this.maxHeight) {
              const ratio = this.maxHeight / height;
              height = this.maxHeight;
              width *= ratio;
            }
            imgEl.width = width;
            imgEl.height = height;
            imgEl.setAttribute('onclick',
              `this.classList.contains('zoomed') ? document.exitFullscreen() && this.classList.toggle('zoomed', false): this.classList.toggle('zoomed', true) && this.requestFullscreen()`);
          }
        } catch (e) {
          context.debug('Could not determine size of image ', src, e);
        }
        context.images.add(src);
        return imgEl;
      }
    };
  }

  protected async postExecute(context: HtmlRR0SsgContext) {
    const imagesUrls = context.images;
    if (imagesUrls.size > 0) {
      for (const imageUrl of imagesUrls) {
        this.handleImage(context, imageUrl);
      }
      imagesUrls.clear();
    }
  }

  private handleImage(context: HtmlRR0SsgContext, imageUrl: string) {
    const inputFile = context.inputFile.name;
    if (imageUrl) {
      const isLocal = !imageUrl.startsWith('http');
      if (isLocal) {
        const contextDir = path.dirname(inputFile);
        const isAbsolute = path.isAbsolute(imageUrl);
        const inFile = isAbsolute ? path.resolve('.' + imageUrl) : path.resolve(path.join(contextDir, imageUrl));
        const outBaseDir = isAbsolute ? this.outBaseDir : path.join(this.outBaseDir, contextDir);
        const outRel = path.join(outBaseDir, imageUrl);
        context.debug('Copying', imageUrl, 'to', outRel);
        const outFile = path.resolve(outRel);
        try {
          const outDir = path.dirname(outFile);
          if (!fs.existsSync(outDir)) {
            fs.mkdirSync(outDir, {recursive: true});
          }
          fs.copyFileSync(inFile, outFile);
        } catch (e) {
          if (e.code === 'ENOENT') {
            context.warn(`File ${inFile} does not exist`);
          } else {
            throw e;
          }
        }
      }
    } else {
      context.warn(`Empty image src in ${inputFile}`);
    }
  }
}
