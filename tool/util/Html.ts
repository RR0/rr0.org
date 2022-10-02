export class Html {

  static element(name: string, innerHTML: string, attrs?: {}): string {
    const attr = attrs ? Object.entries(attrs).reduce((prev, curr) => {
      const [k, v] = curr
      prev = prev + ` ${k}="${v}"`
      return prev
    }, "") : ""
    return `<${name}${attr}>${innerHTML}</${name}>`
  }
}
