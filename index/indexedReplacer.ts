import { DomReplacement } from '../time/DomReplacement';
import { HtmlRR0SsgContext } from '../RR0SsgContext';

export class IndexedReplacer implements DomReplacement<HtmlRR0SsgContext> {

  async replacement(_context: HtmlRR0SsgContext, element: HTMLElement): Promise<HTMLElement> {
    const items = element.querySelectorAll('li');
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const alreadyDone = item.hasAttribute('id');
      if (!alreadyDone) {
        const n = i + 1;
        item.id = String(n);
        item.setAttribute('onclick', 'window.location.hash=' + n);
      }
    }
    return element;
  }
}
