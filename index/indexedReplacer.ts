import { DomReplacement } from '../time/DomReplacement';
import { HtmlRR0SsgContext } from '../RR0SsgContext';

export class IndexedReplacer implements DomReplacement<HtmlRR0SsgContext> {

  async replacement(context: HtmlRR0SsgContext, element: HTMLElement): Promise<HTMLElement> {
    const items = element.querySelectorAll('li');
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const n = i + 1;
      const id = item.getAttribute('id') || item.getAttribute('value') || i + 1;
      const anchor = item.querySelector('.anchor');
      if (!anchor) {
        const anchorEl = context.outputFile.document.createElement('span');
        anchorEl.id = String(id);
        anchorEl.className = 'anchor';
        item.prepend(anchorEl);
        item.setAttribute('onclick', 'window.location.hash=' + n);
      }
    }
    return element;
  }
}
