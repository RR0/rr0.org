import {AnchorDirective} from "rr0-a.directive"

test('detect inner links', () => {
  const element = document.createElement("div")
  element.innerHTML = '<a href="http://rr0.org/path/file.html">same site link</a>'
  const anchorDirective = new AnchorDirective("rr0.org")
  anchorDirective.execute(element)
  expect(element.children[0].getAttribute("target")).not.toEqual("_blank")
})

test('detect local links', () => {
  const element = document.createElement("span")
  element.innerHTML = '<a href=\"#anchor\">local anchor</a>'
  const anchorDirective = new AnchorDirective("rr0.org")
  anchorDirective.execute(element)
  expect(element.children[0].getAttribute("target")).not.toEqual("_blank")
})

test('detect outer links', () => {
  const element = document.createElement("span")
  element.innerHTML = '<a href="http://example.com/path/file.html">external link</a>'
  const anchorDirective = new AnchorDirective("rr0.org")
  anchorDirective.execute(element)
  expect(element.children[0].getAttribute("target")).toEqual("_blank")
})
