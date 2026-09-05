const template = document.createElement("template")
const html = `
<input id="search-input" list="values" type="search" part="input">
<datalist id="values">
</datalist>`
const style = `
:host {
  display: inline-block;
}
input {
  width: 100%;
}
`
template.innerHTML = `<style>${style}</style>${html}`

export class SearchComponent extends HTMLElement {
  /**
   * @readonly
   * @type {string}
   */
  static NAME = "rr0-search"

  /**
   * @type SearchIndex
   */
  #siteIndex

  /**
   * One searchable entry per name: a page's title, plus each of the other names it is known by. A datalist filters on
   * its options' own text, so a surname or a pseudonym is only reachable when it IS an option.
   *
   * @type {{label: string, url: string}[]}
   */
  #entries = []

  #loading = false

  /**
   * @readonly
   * @type {number}
   */
  #maxResultCount = 100

  constructor() {
    super()
    this.shadow = this.attachShadow({ mode: "closed" })
    this.shadow.appendChild(template.content.cloneNode(true))
  }

  static get observedAttributes() {
    return ["placeholder"]
  }

  /**
   * @param {string} value
   */
  set placeholder(value) {
    const input = this.shadow.getElementById("search-input")
    input.placeholder = value
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case "placeholder":
        this.placeholder = newValue
    }
  }

  connectedCallback() {
    this.onmouseover = this.#siteSearchLoad.bind(this)
    const input = this.shadow.getElementById("search-input")
    input.oninput = this.#siteSearchChange.bind(this)
    this.placeholder = "Recherche"
  }

  #siteSearchChange(e) {
    const value = e.target.value.trim()
    const entries = this.#entries
    if (e.inputType === "insertReplacementText" || e.inputType == null) {
      const entry = entries.find(entry => entry.label === value)
      if (entry) {
        window.location.href = "/" + entry.url
      }
    }
    const lowValue = value.toLowerCase()
    const dataList = entries.filter(entry => entry.label.toLowerCase().indexOf(lowValue) >= 0)
    this.#setDataList(dataList.length <= this.#maxResultCount ? dataList : [])
  }

  #siteSearchLoad() {
    if (!this.#siteIndex && !this.#loading) {
      this.#loading = true
      fetch("/search/index.json").then(async (response) => {
        if (response.ok) {
          this.#siteIndex = await response.json()
          const entries = []
          for (const page of this.#siteIndex.pages) {
            const timeStr = page.time
            const title = page.title
            page.title += (timeStr && timeStr !== title.toLowerCase() ? ` (${timeStr})` : "")
            entries.push({label: page.title, url: page.url})
            for (const name of page.names || []) {
              entries.push({label: name, url: page.url})
            }
          }
          this.#entries = entries
        }
        this.#loading = false
      })
    }
  }

  #setDataList(entries) {
    const datalist = this.shadow.getElementById("values")
    datalist.innerHTML = ""
    for (let i = 0; i < entries.length; i++) {
      const option = document.createElement("option")
      option.value = entries[i].label
      datalist.append(option)
    }
  }
}

const name = SearchComponent.NAME
if (!customElements.get(name)) {
  customElements.define(name, SearchComponent)
}
