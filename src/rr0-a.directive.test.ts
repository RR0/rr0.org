import {AnchorDirective} from "rr0-a.directive"
import {Context, User} from "./common"

test('detect inner links', () => {
  const context = new Context(new User())
  const element = document.createElement("div")
  element.innerHTML = '<a href="http://rr0.org/path/file.html">same site link</a>'
  const anchorDirective = new AnchorDirective("rr0.org")
  anchorDirective.execute(context, element)
  expect(element.children[0].getAttribute("target")).not.toEqual("_blank")
})

test('detect local links', () => {
  const context = new Context(new User())
  const root = document.createElement("span")
  root.innerHTML = "<a href='#anchor'>local anchor</a>"
  const anchorDirective = new AnchorDirective("rr0.org")
  anchorDirective.execute(context, root)
  expect(root.children[0].getAttribute("target")).not.toEqual("_blank")
})

test('detect outer links', () => {
  const context = new Context(new User())
  const root = document.createElement("span")
  root.innerHTML = '<a href="http://example.com/path/file.html">external link</a>'
  const anchorDirective = new AnchorDirective("rr0.org")
  anchorDirective.execute(context, root)
  expect(root.children[0].getAttribute("target")).toEqual("_blank")
})
