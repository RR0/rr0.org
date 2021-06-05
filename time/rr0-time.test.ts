import {TimeDirective} from "./rr0-time"
import {CommonModule, Context, User} from "common"
import {TimeService} from "./time"
import {Moment} from "./Moment"
import {LangModule} from "lang"
import {NetModule} from "../src/net"
import {NavModule} from "nav/nav"

const common = new CommonModule()
const net = new NetModule(common)
const lang = new LangModule(common, net)
const root = document.createElement("div")
const contents = document.createElement("div")
contents.className = "contents"
root.appendChild(contents)
const nav = new NavModule(common, lang, root)
let timeService: TimeService
const commonsService = common.service

beforeEach(() => {
  timeService = new TimeService(lang.userLang, "/time/", commonsService)
})

test('converts ISO date', () => {
  const context = new Context(new User())
  context.time = new Moment(common.service)
  const element = document.createElement("span")
  const isoDate = "1972-08-12"
  element.innerHTML = `<time>${isoDate}</time>`
  const anchorDirective = new TimeDirective(commonsService, net.service, timeService)
  anchorDirective.execute(context, element)
  const child = element.children[0]
  const dateStr = "Samedi 12 Août 1972"
  expect(child.outerHTML).toEqual(`<time datetime="${isoDate}" title="${dateStr}">${dateStr}</time>`)
})

test('converts ISO date and time', () => {
  const context = new Context(new User())
  context.time = new Moment(common.service)
  const element = document.createElement("span")
  const time = "15:58"
  const isoDate = "1972-08-12"
  const isoDateTime = `${isoDate} ${time}`
  element.innerHTML = `<time>${isoDateTime}</time>`
  const anchorDirective = new TimeDirective(commonsService, net.service, timeService)
  anchorDirective.execute(context, element)
  const child = element.children[0]
  const dateStr = "Samedi 12 Août 1972"
  expect(child.outerHTML).toEqual(`<time datetime="${isoDate}T${time}" title="${dateStr}, à ${time}">${dateStr} à ${time}</time>`)
})
