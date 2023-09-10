import { ReplaceCommand } from 'ssg-api/dist/src/step/content/replace/ReplaceCommand';
import { SsgFile } from 'ssg-api/dist/src/util/file/SsgFile';
import { HtmlRR0SsgContext } from './RR0SsgContext';
import { createCanvas, loadImage } from 'canvas';
import fs from 'fs';
import path from 'path';

export class OpenGraphCommand implements ReplaceCommand<HtmlRR0SsgContext> {
  constructor(protected outDir: string) {
  }

  async execute(context: HtmlRR0SsgContext): Promise<SsgFile> {
    const title = context.inputFile.title;
    if (!title) {
      return context.outputFile;
    }

    const width = 1200;
    const height = 600;

    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    const outDoc = context.outputFile.document;
    const dir = path.dirname(context.outputFile.name);

    const docImages = outDoc.documentElement.getElementsByTagName('img');
    let imageWidthFactor = 0.5;
    let imageIndex = 0;
    if (imageIndex < docImages.length) {
      const firstImage = docImages[0];
      const firstImageUrl = firstImage.getAttribute('src');
      try {
        const src = firstImageUrl.startsWith('/') ? firstImageUrl.substring(1) : path.join(dir, firstImageUrl);
        const image = await loadImage(src);
        const heightFactor = height / image.height;
        const imageWidth = image.width * heightFactor;
        const imageX = width - imageWidth;
        imageWidthFactor = imageX / width;
        ctx.drawImage(image, imageX, 0, imageWidth, height);
      } catch (e) {
        context.error('Error loading image', firstImageUrl, ', skipping it');
        imageIndex++;
      }
    }

    ctx.beginPath();
    { // put stroke color to transparent
      ctx.strokeStyle = 'transparent';
      // draw rectablge towards right hand side
      ctx.rect(0, 0, width, height);
      // create linear gradient
      const grdLinear = ctx.createLinearGradient(0, 0, width, 0);
      // Important bit here is to use rgba()
      grdLinear.addColorStop(0, 'rgba(255, 255, 255, 1)');
      grdLinear.addColorStop(imageWidthFactor, 'rgba(255, 255, 255, 1)');
      grdLinear.addColorStop(1, 'rgba(255, 255, 255, 0)');
      // add gradient to rectangle
      ctx.fillStyle = grdLinear;
      // step below are pretty much standard to finish drawing an object to canvas
      ctx.fill();
      ctx.stroke();
    }
    ctx.closePath();

    ctx.font = '400 3em system-ui,sans-serif';
    ctx.fillStyle = '#666';
    const margin = 40;
    const lineHeight = 70;
    let lineText = title;
    let remainingText = lineText;
    let splitPos = title.length;
    let line = 0;
    let overflow = true;
    while (overflow && remainingText.length > 0) {
      const textWidth = ctx.measureText(lineText);
      overflow = textWidth.width > width - margin;
      if (overflow) {
        splitPos = lineText.lastIndexOf(' ');
        if (splitPos > 0) {
          remainingText = lineText.substring(splitPos).trim();
          lineText = lineText.substring(0, splitPos);
        } else {
          remainingText = '';
        }
      } else {
        ctx.fillText(lineText, margin, 100 + line * lineHeight);
        line++;
        overflow = lineText != remainingText;
        lineText = remainingText;
      }
    }

    ctx.font = '400 1.25em system-ui,sans-serif';
    ctx.fillText(context.outputFile.meta.copyright || 'RR0.org', margin, height - 50);

    const buffer = canvas.toBuffer('image/png');
    const imageUrl = path.join('/', dir, '_og.png');
    fs.writeFileSync(path.join(this.outDir, imageUrl), buffer);

    const ogMeta = outDoc.createElement('meta');
    ogMeta.setAttribute('property', 'og:image');
    ogMeta.setAttribute('content', imageUrl);
    outDoc.head.append(ogMeta);

    context.outputFile.contents = outDoc.documentElement.outerHTML;

    return context.outputFile;
  }
}
