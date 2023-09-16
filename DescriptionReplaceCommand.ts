import { HtmlRR0SsgContext } from './RR0SsgContext';
import { ReplaceCommand } from 'ssg-api/dist/src/step/content/replace/ReplaceCommand';
import { SsgFile } from 'ssg-api/dist/src/util/file/SsgFile';

/**
 * Adds an "abstract" HTML paragraph from a <meta name="description">, if any.
 */
export class DescriptionReplaceCommand implements ReplaceCommand<HtmlRR0SsgContext> {
  constructor(protected readonly defaultDescription: string, protected readonly abstractClass = 'abstract') {
  }

  async execute(context: HtmlRR0SsgContext): Promise<SsgFile> {
    const SsgFile = context.inputFile;
    const inDescription = SsgFile.meta.description;
    const outFile = context.outputFile;
    const outDoc = outFile.document;
    const existingAbstract = outDoc.querySelector(`.${this.abstractClass}`);
    let outDescription: string;
    if (existingAbstract) {
      outDescription = inDescription || existingAbstract.textContent.toString();
    } else if (inDescription) {
      const abstractFromDescription = outDoc.createElement('p');
      abstractFromDescription.className = this.abstractClass;
      abstractFromDescription.textContent = inDescription;
      const body = outDoc.body;
      body.insertBefore(abstractFromDescription, body.firstChild);
      outDescription = inDescription;
    } else {
      outDescription = this.defaultDescription;
    }
    outDescription = outDescription.replace(/\s{2,}/g, ' ');
    outFile.meta.description = outDescription;
    const descriptionMeta = outDoc.createElement('meta') as HTMLMetaElement;
    descriptionMeta.name = 'description';
    descriptionMeta.content = outFile.meta.description;
    outFile.document.head.append(descriptionMeta);
    context.outputFile.contents = outDoc.documentElement.outerHTML;
    return outFile;
  }
}
