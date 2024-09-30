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

  #loading = false

  /**
   * @readonly
   * @type {number}
   */
  #maxResultCount = 100

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
    const value = e.target.value.trim()
    const pages = this.#siteIndex?.pages || []
    if (e.inputType === "insertReplacementText" || e.inputType == null) {
      const pageIndex = pages.findIndex(page => page.title === value)
      if (pageIndex >= 0) {
        const page = pages[pageIndex]
        window.location.href = "/" + page.url
      }
    }
    const lowValue = value.toLowerCase()
    const dataList = pages.filter(page => page.title.toLowerCase().indexOf(lowValue) >= 0)
    this.#setDataList(dataList.length <= this.#maxResultCount ? dataList : [])
  }

  #siteSearchLoad () {
    if (!this.#siteIndex && !this.#loading) {
      this.#loading = true
      fetch("/search/index.json").then(async (response) => {
        if (response.ok) {
          this.#siteIndex = await response.json()
          for (const page of this.#siteIndex.pages) {
            const timeStr = page.time
            const title = page.title
            page.title += (timeStr && timeStr !== title.toLowerCase() ? ` (${timeStr})` : "")
          }
        }
        this.#loading = false
      })
    }
  }

  #setDataList (pages) {
    const datalist = this.shadow.getElementById("values")
    datalist.innerHTML = ""
    for (let i = 0; i < pages.length; i++) {
      const page = pages[i]
      const option = document.createElement("option")
      option.value = page.title
      datalist.append(option)
    }
  }
}

const name = SearchComponent.NAME
if (!customElements.get(name)) {
  customElements.define(name, SearchComponent)
}
