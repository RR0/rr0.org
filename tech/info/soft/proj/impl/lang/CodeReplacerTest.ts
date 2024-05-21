import { describe, expect, test } from '@javarome/testscript';
import { CodeReplacer } from './CodeReplacer';
import { rr0TestUtil } from '../../../../../../test/RR0TestUtil';
import { HtmlCodeParser } from './HtmlCodeParser';

describe('CodeReplacer', () => {
  const replacer = new CodeReplacer([new HtmlCodeParser()]);

  test('replaces nothing', async () => {
    const context = rr0TestUtil.newHtmlContext('tech/info/soft/proj/design/arch/web/js/index.html',
      `<p>window.document.write("Hello!")</p>`);
    const codeEl = context.file.document.querySelector("code")
    const replacement = await replacer.replacement(context, codeEl);
    expect(replacement).toBeNull();
  });

  test('replaces tags', async () => {
    const code = 'window.document.write("Hello!")';
    const context = rr0TestUtil.newHtmlContext('tech/info/soft/proj/design/arch/web/js/index.html',
      `<code>${code}</code>`);
    const codeEl = context.file.document.querySelector("code")
    const replacement = await replacer.replacement(context, codeEl);
    expect(replacement.innerHTML).toBe(code);
  });

  test('replaces tags', async () => {
    const code = `
         <script>
           // Si le navigateur est de type 4.0 on utilise latestver.html
           if (navigator.userAgent.indexOf("4.0") >= 0) {
             window.location = "latestver.html"
           } else if (ver >= 11) {  // Sinon on regarde s'il ont JavaScript 1.1 avant d'utiliser newver.html
             window.location = "newver.html"
           } else {  // Par défaut on choisit oldver.html pour tous les autres.
             window.location = "oldver.html"
           }
         </script>
       `;
    const context = rr0TestUtil.newHtmlContext('tech/info/soft/proj/design/arch/web/js/index.html',
      `<pre><code>${code}</code></pre>`);
    const codeEl = context.file.document.querySelector("code")
    const replacement = await replacer.replacement(context, codeEl);
    const innerHTML = replacement.innerHTML;
    expect(innerHTML).toBe(`
<span class="tag start">&lt;script&gt;</span>
  // Si le navigateur est de type 4.0 on utilise latestver.html
  if (navigator.userAgent.indexOf("4.0") &gt;= 0) {
    window.location = "latestver.html"
  } else if (ver &gt;= 11) {  // Sinon on regarde s'il ont JavaScript 1.1 avant d'utiliser newver.html
    window.location = "newver.html"
  } else {  // Par défaut on choisit oldver.html pour tous les autres.
    window.location = "oldver.html"
  }
<span class="tag end">&lt;/script&gt;</span>
`);
  });
});
