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

  #siteIndex

  #loading = false

  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: "closed" })
    this.shadow.appendChild(template.content.cloneNode(true))
  }

  connectedCallback () {
    this.onmouseover = this.#siteSearchLoad.bind(this)
    const input = this.shadow.getElementById("search-input")
    input.oninput = this.#siteSearchChange.bind(this)
    input.placeholder = this.getAttribute("placeholder") || "Recherche"
  }

  #siteSearchChange (e) {
    if (e.inputType === "insertReplacementText" || e.inputType == null) {
      const value = e.target.value.trim()
      const pageIndex = this.#siteIndex.pages.findIndex(page => page.title === value)
      if (pageIndex >= 0) {
        const page = this.#siteIndex.pages[pageIndex]
        window.location.href = "/" + page.url
      }
    }
  }

  #siteSearchLoad () {
    if (!this.#siteIndex && !this.#loading) {
      this.#loading = true
      fetch("/search/index.json").then(async (response) => {
        const datalist = this.shadow.querySelector("#values")
        if (response.ok) {
          this.#siteIndex = await response.json()
          const pages = this.#siteIndex.pages
          for (let i = 0; i < pages.length; i++) {
            const page = pages[i]
            const option = document.createElement("option")
            const timeStr = page.time
            const title = page.title
            page.title += (timeStr && timeStr !== title.toLowerCase() ? ` (${timeStr})` : "")
            option.value = page.title
            datalist.append(option)
          }
        }
        this.#loading = false
      })
    }
  }
}

const name = SearchComponent.NAME
if (!customElements.get(name)) {
  customElements.define(name, SearchComponent)
}
