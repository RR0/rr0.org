import { DomReplacer, ReplacerFactory } from 'ssg-api';
import { IndexedReplacer } from './indexedReplacer';
import { HtmlRR0SsgContext } from '../RR0SsgContext';

export class IndexedReplacerFactory
  implements ReplacerFactory<DomReplacer> {

  protected singleton?: IndexedReplacer;

  async create(context: HtmlRR0SsgContext): Promise<DomReplacer> {
    const instance = await this.getInstance();
    return {
      replace:
        (original: HTMLElement): Promise<HTMLElement> => {
          return instance.replacement(context, original);
        }
    };
  }

  protected async getInstance(): Promise<IndexedReplacer> {
    if (!this.singleton) {
      this.singleton = new IndexedReplacer();
    }
    return this.singleton;
  }
}
