import {AnchorDirective} from "rr0-a.directive"

const anchorDirective = new AnchorDirective("rr0.org")
beforeEach(() => {
  const div = document.createElement("div")
  div.innerHTML = '<div class="contents"><div class="text"></div></div>'
})

test('detect inner links', () => {
  const element = document.createElement("div")
  element.innerHTML = '<a href="http://rr0.org/path/file.html">same site link</a>'
  anchorDirective.execute(element)
  expect(element.children[0].getAttribute("target")).not.toEqual("_blank")
})

test('detect local links', () => {
  const element = document.createElement("span")
  element.innerHTML = '<a href=\"#anchor\">local anchor</a>'
  anchorDirective.execute(element)
  expect(element.children[0].getAttribute("target")).not.toEqual("_blank")
})

test('detect outer links', () => {
  const element = document.createElement("span")
  element.innerHTML = '<a href="http://example.com/path/file.html">external link</a>'
  anchorDirective.execute(element)
  expect(element.children[0].getAttribute("target")).toEqual("_blank")
})
