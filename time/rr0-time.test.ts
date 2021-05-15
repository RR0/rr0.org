import {TimeDirective} from "./rr0-time"
import common, {Context, User} from "common"
import net from "../src/net"
import {TimeService} from "./time"
import lang from "lang"

let timeService: TimeService
const commonsService = common.service
beforeEach(() => {
  timeService = new TimeService(lang.userLang, "/time/", commonsService)
})

test('converts ISO date', () => {
  const context = new Context(new User())
  const element = document.createElement("span")
  const isoDate = "1972-08-12"
  element.innerHTML = `<time>${isoDate}</time>`
  const anchorDirective = new TimeDirective(commonsService, net.service, timeService)
  anchorDirective.execute(context, element)
  const child = element.children[0]
  const dateStr = "Samedi 12 Août 1972"
  expect(child.outerHTML).toEqual(`<time title="${dateStr}" datetime="${isoDate}">${dateStr}</time>`)
})

test('converts ISO date and time', () => {
  const context = new Context(new User())
  const element = document.createElement("span")
  const time = "15:58"
  const isoDate = "1972-08-12"
  const isoDateTime = `${isoDate} ${time}`
  element.innerHTML = `<time>${isoDateTime}</time>`
  const anchorDirective = new TimeDirective(commonsService, net.service, timeService)
  anchorDirective.execute(context, element)
  const child = element.children[0]
  const dateStr = "Samedi 12 Août 1972"
  expect(child.outerHTML).toEqual(`<time title="${dateStr}, à ${time}" datetime="${isoDate}T${time}">${dateStr} à ${time}</time>`)
})
