import { DomReplacer, ReplacerFactory } from 'ssg-api';
import { HtmlRR0SsgContext } from './RR0SsgContext';
import { DomReplacement } from './time/DomReplacement';

class IndexedReplacer implements DomReplacement<HtmlRR0SsgContext> {

  async replacement(context: HtmlRR0SsgContext, element: HTMLElement): Promise<HTMLElement> {
    const items = element.querySelectorAll('li');
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const content = item.firstChild;
      if (content.nodeType === 3) {
        const link = context.outputFile.document.createElement('a');
        link.href = '#' + i;
        link.appendChild(content.cloneNode(true));
        item.replaceChild(link, content);
        item.id = String(i);
        context.logger.log(item.outerHTML);
      }
    }
    return element;
  }
}

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
