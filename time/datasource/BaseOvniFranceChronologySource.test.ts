import { describe, expect, test } from "@javarome/testscript"
import { BaseOvniFranceChronologySource } from "./BaseOvniFranceChronologySource"
import { rr0TestUtil } from "../../test/RR0TestUtil"

describe("BaseOvniFranceChronologySource", () => {

  test("fetch month", async () => {
    const datasource = new BaseOvniFranceChronologySource()
    const context = rr0TestUtil.newHtmlContext("time/1/9/7/0/03/index.html")
    context.time.setYear(1970)
    context.time.setMonth(3)
    const items = await datasource.get(context)
    expect(items.length).toBe(4)
    expect(items[0].innerHTML).toBe(
      `<time>1970-03 16:00</time> À <span class="place">Le Mans (72)</span>, observation <span class="source">Luc Chastan: <i>Base OVNI France</i><a href="http://baseovnifrance.free.fr/listgen.php?typlist=20&amp;page=0&amp;numobs=2760">, cas n°&nbsp;2760</a></span>`)
    expect(items[1].innerHTML).toBe(
      `<time>1970-03-12 07:40</time> À <span class="place">Lyon (69)</span>, observation <span class="source">Luc Chastan: <i>Base OVNI France</i><a href="http://baseovnifrance.free.fr/listgen.php?typlist=20&amp;page=0&amp;numobs=1650">, cas n°&nbsp;1650</a></span>`)
    expect(items[2].innerHTML).toBe(
      `<time>1970-03-16 20:00</time> À <span class="place">Briançon (05)</span>, observation <span class="source">Luc Chastan: <i>Base OVNI France</i><a href="http://baseovnifrance.free.fr/listgen.php?typlist=20&amp;page=0&amp;numobs=3088">, cas n°&nbsp;3088</a></span>`)
  })
})
