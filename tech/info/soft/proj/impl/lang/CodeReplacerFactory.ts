import { CodeReplacer } from './CodeReplacer';
import { DomReplacer, ReplacerFactory } from 'ssg-api';
import { HtmlRR0SsgContext } from '../../../../../../RR0SsgContext';
import { HtmlCodeParser } from './HtmlCodeParser';

export class CodeReplacerFactory implements ReplacerFactory<DomReplacer> {

  protected readonly replacer = new CodeReplacer([new HtmlCodeParser()]);

  /**
   * Creates a contextual replacer for time tags.
   *
   * @param context
   */
  async create(context: HtmlRR0SsgContext): Promise<DomReplacer> {
    return {
      replace: (original: HTMLElement): Promise<HTMLElement> => {
        return this.replacer.replacement(context, original);
      }
    };
  }
}
