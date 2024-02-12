import { describe, expect, test } from "@javarome/testscript"
import { rr0TestUtil } from "../../../test/RR0TestUtil"
import { NuforcChronologySource } from "./NuforcChronologySource"

describe("NuforcChronologySource", () => {

  test("fetch month", async () => {
    const datasource = new NuforcChronologySource()
    const context = rr0TestUtil.newHtmlContext("time/1/9/7/0/03/index.html")
    context.time.setYear(1970)
    context.time.setMonth(3)
    const items = await datasource.get(context)
    expect(items.length).toBe(7)
    expect(items[0].innerHTML).toBe(
      `<time>1970-03-30 21:00</time> À <span class="place">Slocomb (AL, USA)</span>, observation, d'un cercle <span class="source">NUFORC: <i>Online Database</i><a href="https://nuforc.org/sighting/?id=34046">, cas n°&nbsp;34046</a></span>`)
    expect(items[1].innerHTML).toBe(
      `<time>1970-03-15 22:00</time> À <span class="place">Castlegar (Canada) (BC, Canada)</span>, observation, d'une lumière <span class="source">NUFORC: <i>Online Database</i><a href="https://nuforc.org/sighting/?id=35488">, cas n°&nbsp;35488</a></span>`)
    expect(items[2].innerHTML).toBe(
      `<time>1970-03-20 16:00</time> À <span class="place">Fort Worth (TX, USA)</span>, observation, d'un disque <span class="source">NUFORC: <i>Online Database</i><a href="https://nuforc.org/sighting/?id=35880">, cas n°&nbsp;35880</a></span>`)
  })
})
