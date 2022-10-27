export interface DomReplacer {
  replace: (original: Element) => Promise<Element>
}
