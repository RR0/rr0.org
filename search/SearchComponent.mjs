import { InputSearchComponent } from "./InputSearchComponent.mjs"

/**
 * The historical <rr0-search> element, still written in the thousands of already generated pages (and loaded from
 * this module): it is the same search box as <rr0-input-search>, so that the whole site gets it without a rebuild.
 */
export class SearchComponent extends InputSearchComponent {
  /**
   * @readonly
   * @type {string}
   */
  static NAME = "rr0-search"
}

if (!customElements.get(SearchComponent.NAME)) {
  customElements.define(SearchComponent.NAME, SearchComponent)
}
