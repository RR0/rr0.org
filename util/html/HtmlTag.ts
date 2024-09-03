export class HtmlTag {

  constructor(protected name: string, protected innerHTML: string, protected attrs = {}) {
  }

  static toString(name: string, innerHTML: string, attrs: Record<string, unknown> = {}): string {
    const attr = Object.entries(attrs).reduce((prev, curr) => {
      const [k, v] = curr
      prev = prev + ` ${k}="${v}"`
      return prev
    }, "")
    return `<${name}${attr}>${innerHTML}</${name}>`
  }

  toString(): string {
    return HtmlTag.toString(this.name, this.innerHTML, this.attrs)
  }
}
