import { DomReplacement } from '../time/DomReplacement';
import { HtmlRR0SsgContext } from '../RR0SsgContext';

export class IndexedReplacer implements DomReplacement<HtmlRR0SsgContext> {

  async replacement(context: HtmlRR0SsgContext, element: HTMLElement): Promise<HTMLElement> {
    const items = element.querySelectorAll('li');
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const anchor = item.querySelector(':scope > .anchor');
      if (!anchor) {
        const anchorEl = context.outputFile.document.createElement('span');
        const id = item.getAttribute('id') || item.getAttribute('value') || i + 1;
        anchorEl.id = String(id);
        anchorEl.className = 'anchor';
        item.prepend(anchorEl);
        const n = i + 1;
        item.setAttribute('onclick', 'window.location.hash=' + n);
      }
    }
    return element;
  }
}
