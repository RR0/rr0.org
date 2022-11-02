export interface DomReplacer<E extends Element = HTMLElement> {
  replace: (original: E) => Promise<E>
}
