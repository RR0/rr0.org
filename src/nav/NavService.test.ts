import nav from "nav/nav"
import {AnchorDirective} from "rr0-a.directive"

const navService = nav.service
const anchorDirective = new AnchorDirective()
beforeEach(() => {
  // navService.host = 'rr0.org'
})

test('detect inner links', () => {
  const element = document.createElement("div")
  element.className = "contents text"
  element.innerHTML = '<a href="http://rr0.org/path/file.html">same site link</a>'
  anchorDirective.execute(element)
  expect(element.getAttribute("target")).not.toEqual("_blank")
})

test('detect local links', () => {
  const element = document.createElement("span")
  element.className = "contents text"
  element.innerHTML = '<a href=\"#anchor\">local anchor</a>'
  anchorDirective.execute(element)
  expect(element.getAttribute("target")).not.toEqual("_blank")
})

test('detect outer links', () => {
  const element = document.createElement("span")
  element.className = "contents text"
  element.innerHTML = '<a href=\"http://example.com/path/file.html\">external link</a>'
  anchorDirective.execute(element)
  expect(element.getAttribute("target")).toEqual("_blank")
})
