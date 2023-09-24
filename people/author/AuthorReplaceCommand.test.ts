import { AuthorReplaceCommand } from './AuthorReplaceCommand';
import { rr0TestUtil } from '../../test/RR0TestUtil';
import { HtmlSsgFile } from 'ssg-api';

describe("AuthorReplaceCommand", () => {

  test("no author", async () => {
    const timeFile = 'time/1/9/5/4/index.html';
    const command = new AuthorReplaceCommand([timeFile]);
    const context = rr0TestUtil.newHtmlContext(timeFile,
      `This is published by <!--#echo var="author" -->!`)
    const file = await command.execute(context) as HtmlSsgFile
    expect(file.meta.author).toEqual([])
    expect(file.contents).toBe("This is published by !")
  })

  test("author only", async () => {
    const timeFile = 'time/1/9/5/4/10/index.html';
    const command = new AuthorReplaceCommand([timeFile]);
    const context = rr0TestUtil.newHtmlContext(timeFile,
      `This is published by <!--#echo var="author" -->!`)
    context.inputFile.meta.author.push("Beau, Jérôme")
    const file = await command.execute(context) as HtmlSsgFile
    expect(file.meta.author).toEqual(["Beau, Jérôme"])
    expect(file.contents).toBe(
      `This is published by <div class="document-author"><span class="people">Beau, Jérôme</span></div>!`)
  })

  test("copyright only", async () => {
    const timeFile = 'time/1/9/5/4/10/index.html';
    const command = new AuthorReplaceCommand([timeFile]);
    const context = rr0TestUtil.newHtmlContext(timeFile,
      `This is published by <!--#echo var="author" -->!`)
    context.inputFile.meta.copyright = "Some publication"
    const file = await command.execute(context) as HtmlSsgFile
    expect(file.meta.author).toEqual([])
    expect(file.meta.copyright).toBe("Some publication")
    expect(file.contents).toBe(`This is published by <div class="document-author">Some publication</div>!`)
  })

  test("author with copyright", async () => {
    const timeFile = 'time/1/9/5/4/10/index.html';
    const command = new AuthorReplaceCommand([timeFile]);
    const context = rr0TestUtil.newHtmlContext(timeFile,
      `This is published by <!--#echo var="author" -->!`)
    context.inputFile.meta.author.push("Beau, Jérôme")
    context.inputFile.meta.copyright = "Some publication"
    const file = await command.execute(context) as HtmlSsgFile
    expect(file.meta.author).toEqual(["Beau, Jérôme"])
    expect(file.meta.copyright).toBe("Some publication")
    expect(file.contents).toBe(
      `This is published by <div class="document-author"><span class="people">Beau, Jérôme</span>: Some publication</div>!`)
  })
})

