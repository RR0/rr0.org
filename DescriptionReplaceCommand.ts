import { HtmlRR0SsgContext } from './RR0SsgContext';
import { ReplaceCommand } from 'ssg-api/dist/src/step/content/replace/ReplaceCommand';
import { SsgFile } from 'ssg-api/dist/src/util/file/SsgFile';

/**
 * Adds an "abstract" HTML paragraph from a <meta name="description">, if any.
 */
export class DescriptionReplaceCommand implements ReplaceCommand<HtmlRR0SsgContext> {
  static readonly abstractClass = 'abstract';

  async execute(context: HtmlRR0SsgContext): Promise<SsgFile> {
    const SsgFile = context.inputFile;
    let authors = SsgFile.meta.description;
    const outFile = context.outputFile;
    const outDoc = outFile.document;
    const existingAbstract = outDoc.querySelector(`.${DescriptionReplaceCommand.abstractClass}`);
    if (!existingAbstract) {
      const abstractFromDescription = outDoc.createElement('p');
      abstractFromDescription.className = DescriptionReplaceCommand.abstractClass;
      const body = outDoc.body;
      body.insertBefore(abstractFromDescription, body.firstChild);
      outFile.contents = outDoc.documentElement.outerHTML;
    }
    return outFile;
  }
}
