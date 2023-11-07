import { CodeParser } from './CodeParser';

export class HtmlCodeParser extends CodeParser {
  constructor(protected tagOpenStart = '&lt;', protected tagOpenEnd = '&gt;',
              protected tagCloseStart = '&lt;\/', protected tagCloseEnd = '&gt;') {
    super();
  }

  protected escape(line: string): string {
    return line.replaceAll('<', this.tagOpenStart).replaceAll('>', this.tagOpenEnd);
  }

  protected parseLine(line: string): string {
    const tagSpan = '<span class="tag ';
    //if (line.indexOf(tagSpan) < 0) {
    const l = this.escape(line);
    /* const tagName = '([A-z-]+)';
     return l
       .replaceAll(
         new RegExp(this.tagOpenStart + tagName + this.tagOpenEnd, 'gm'),
         `${tagSpan}start">${this.tagOpenStart}$1${this.tagOpenEnd}</span>`
       )
       .replaceAll(
         new RegExp(this.tagCloseStart + tagName + this.tagCloseEnd, 'gm'),
         `${tagSpan}end">${this.tagCloseStart}$1${this.tagCloseEnd}</span>`
       );
   }*/
    return l;
  }
}
