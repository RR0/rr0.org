import {Context, SelectorDirective} from "../common"
import {SearchService} from "./search-service"

const template = require("./rr0-search.html").default

export class SearchDirective extends SelectorDirective {

  constructor(private searchService: SearchService) {
    super("#rr0-search")
  }

  async doSearch(searchInput: string, el: HTMLElement) {
    const data = await this.searchService.search(searchInput)
    // $scope.searchResults = [];
    const results = data.searchInformation.totalResults
    if (results > 0) {
      const resultsEl = el.querySelector(".search-result")
      resultsEl.innerHTML = ""
      const items = data.items
      for (let i = 0; i < items.length; i++) {
        const r = items[i]
        const item = document.createElement("li")
        item.title = r.snippet
        item.tabIndex = 200 + i
        item.innerHTML = `<a href="${r.link}"><span>${r.htmlTitle}</span></a>`
        resultsEl.appendChild(item)
      }
    }
    return results
  }

  searchClick(item) {
    document.body.className += ' wait';
    (<any>window).location = item.link
  }

  searchKey(event, item) {
    if (event.keyCode === 40) {
      this.searchClick(item)
    }
  }

  protected async handle(context: Context, el: HTMLElement): Promise<void> {
    el.innerHTML = template
    const searchInput = el.querySelector(`input[type="search"]`) as HTMLInputElement
    const formEl = el.querySelector(`form`) as HTMLFormElement
    formEl.onsubmit = (_ev) => this.doSearch(searchInput.value, el)
    searchInput.onkeydown = this.searchKey.bind(this)
    const submit = el.querySelector(".submit") as HTMLElement
    submit.onclick = () => this.doSearch(searchInput.value, el)
  }
}
