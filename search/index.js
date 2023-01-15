var siteIndex

function siteSearchChange(e) {
  const value = e.target.value.trim()
  const pageIndex = siteIndex.pages.findIndex(page => page.title === value)
  if (pageIndex >= 0) {
    const page = siteIndex.pages[pageIndex]
    window.location.href = `/${page.url}`
  }
}

function siteSearchLoad() {
  const datalist = document.querySelector("#search-site-values")
  if (!siteIndex) {
    fetch("/search/index.json").then(async (response) => {
      if (response.ok) {
        siteIndex = await response.json()
        for (const page of siteIndex.pages) {
          const option = document.createElement("option")
          option.value = page.title
          datalist.append(option)
        }
      }
    })
  }
}

const search = document.querySelector("#main-nav .search")
search.onmouseover = siteSearchLoad
const searchInput = document.querySelector("#search-site")
searchInput.oninput = (event) => siteSearchChange(event)
